import io
from minio import Minio
from minio.error import S3Error
from flask import send_file
from config_manager import load_config

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
