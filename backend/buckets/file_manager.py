import io, os, time, hmac, hashlib, base64, json
from minio import Minio
from flask import send_file
from config_manager import load_config

LINKS_FILE = os.path.abspath("backend/shared_links.json")


# ---------------------- CLIENT ----------------------

def get_client():
    cfg = load_config()
    endpoint = f"localhost:{cfg.get('minio_port', 9000)}"
    return Minio(
        endpoint,
        access_key=cfg.get("access_key", "minioadmin"),
        secret_key=cfg.get("secret_key", "minioadmin"),
        secure=False
    )


# ---------------------- FILE MANAGEMENT ----------------------

def list_files(bucket):
    client = get_client()
    if not client.bucket_exists(bucket):
        return []
    return [
        {
            "name": obj.object_name,
            "size": obj.size,
            "last_modified": obj.last_modified.isoformat()
        }
        for obj in client.list_objects(bucket, recursive=True)
    ]


def upload_file(bucket, file_obj, filename):
    client = get_client()
    if not client.bucket_exists(bucket):
        raise Exception("Bucket não existe")
    client.put_object(bucket, filename, file_obj, length=-1, part_size=10 * 1024 * 1024)
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


# ---------------------- TEMPORARY LINKS ----------------------
def _load_links():
    if os.path.exists(LINKS_FILE):
        try:
            with open(LINKS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return []


def _save_links(data):
    os.makedirs(os.path.dirname(LINKS_FILE), exist_ok=True)
    with open(LINKS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


def _get_secret():
    cfg = load_config()
    return cfg.get("share_secret_key", "supersecretlinkkey").encode()


def generate_temporary_link(bucket, filename, expires_in=300):
    """Gera link temporário assinado, registra histórico e data de expiração"""
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
    now = int(time.time())

    # Evita duplicar o mesmo link
    existing = [l for l in links if l["sig"] == sig]
    if existing:
        for l in links:
            if l["sig"] == sig:
                l.update({
                    "exp": exp,
                    "active": True,
                    "created": now,
                    "expires_in": expires_in
                })
    else:
        links.append({
            "bucket": bucket,
            "filename": filename,
            "exp": exp,
            "sig": sig,
            "active": True,
            "created": now,
            "expires_in": expires_in
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
    """Retorna links ativos e válidos (ordenados por expiração mais próxima)"""
    now = int(time.time())
    links = _load_links()
    active = [l for l in links if l.get("active") and l.get("exp", 0) > now]
    for l in active:
        l["remaining_seconds"] = l["exp"] - now
    active.sort(key=lambda l: l["exp"])
    return active


def deactivate_link(sig):
    """Cancela manualmente um link"""
    links = _load_links()
    updated = False
    for l in links:
        if l["sig"] == sig and l["active"]:
            l["active"] = False
            l["cancelled_at"] = int(time.time())
            updated = True
    if updated:
        _save_links(links)
    return updated


def get_link_history():
    """Histórico completo: ativos e inativos, ordenados por data de criação"""
    links = _load_links()
    return sorted(links, key=lambda l: l.get("created", 0), reverse=True)


def get_next_expiration():
    """Retorna o timestamp do link com expiração mais próxima"""
    active = get_active_links()
    if not active:
        return None
    return active[0]["exp"]