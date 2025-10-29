import io, os, time, hmac, hashlib, base64, json, socket
from minio import Minio
from minio.error import S3Error
from flask import send_file
from config_manager import load_config

LINKS_FILE = os.path.abspath("backend/shared_links.json")

def get_client():
    cfg = load_config()
    endpoint = f"localhost:{cfg.get('minio_port', 9000)}"
    return Minio(
        endpoint,
        access_key=cfg.get("access_key", "minioadmin"),
        secret_key=cfg.get("secret_key", "minioadmin"),
        secure=False
    )

def list_files(bucket):
    client = get_client()
    if not client.bucket_exists(bucket):
        return []
    return [
        {"name": obj.object_name, "size": obj.size, "last_modified": obj.last_modified.isoformat()}
        for obj in client.list_objects(bucket, recursive=True)
    ]

def upload_file(bucket, file_obj, filename):
    client = get_client()
    if not client.bucket_exists(bucket):
        raise Exception("Bucket não existe")
    client.put_object(bucket, filename, file_obj, length=-1, part_size=10*1024*1024)
    return {"ok": True, "message": f"Arquivo '{filename}' enviado para '{bucket}'"}

def delete_file(bucket, filename):
    client = get_client()
    if not client.bucket_exists(bucket):
        return {"ok": False, "message": "Bucket inexistente"}
    client.remove_object(bucket, filename)
    return {"ok": True, "message": f"Arquivo '{filename}' removido"}

def download_file(bucket, filename):
    client = get_client()
    if not client.bucket_exists(bucket):
        raise Exception("Bucket inexistente")
    data = client.get_object(bucket, filename)
    return send_file(io.BytesIO(data.read()), download_name=filename, as_attachment=True)

# ---------------------- LINKS TEMPORÁRIOS ----------------------

def _load_links():
    if os.path.exists(LINKS_FILE):
        try:
            with open(LINKS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except:
            pass
    return []

def _save_links(data):
    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def _get_secret():
    cfg = load_config()
    return cfg.get("share_secret_key", "supersecretlinkkey").encode()


def generate_temporary_link(bucket, filename, expires_in=300):
    """Gera link temporário assinado e registra no histórico"""
    secret = _get_secret()
    exp = int(time.time()) + int(expires_in)
    raw = f"{bucket}/{filename}:{exp}".encode()
    sig = base64.urlsafe_b64encode(
        hmac.new(secret, raw, hashlib.sha256).digest()
    ).decode().rstrip("=")

    cfg = load_config()
    backend_url = cfg.get("backend_url", "http://localhost:8080")
    link_path = f"{backend_url}/api/share/{bucket}/{filename}?exp={exp}&sig={sig}"

    links = _load_links()
    links.append({
        "bucket": bucket,
        "filename": filename,
        "exp": exp,
        "sig": sig,
        "active": True,
        "created": int(time.time())
    })
    _save_links(links)

    return link_path

def validate_temporary_link(bucket, filename, exp, sig):
    """Valida se link é válido e ativo"""
    try:
        exp = int(exp)
        if time.time() > exp:
            return False
        data = f"{bucket}/{filename}:{exp}"
        expected_sig = hmac.new(_get_secret(), data.encode(), hashlib.sha256).digest()
        expected = base64.urlsafe_b64encode(expected_sig).decode().rstrip("=")
        if not hmac.compare_digest(expected, sig):
            return False

        links = _load_links()
        for l in links:
            if l["sig"] == sig and l["active"]:
                return True
        return False
    except Exception:
        return False

def get_active_links():
    """Retorna links ainda válidos"""
    now = int(time.time())
    links = _load_links()
    return [l for l in links if l["active"] and l["exp"] > now]

def deactivate_link(sig):
    """Cancela manualmente um link"""
    links = _load_links()
    updated = False
    for l in links:
        if l["sig"] == sig:
            l["active"] = False
            updated = True
    if updated:
        _save_links(links)
    return updated
