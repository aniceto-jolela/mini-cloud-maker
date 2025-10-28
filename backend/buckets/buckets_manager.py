import os
from minio import Minio
from minio.error import S3Error
from config_manager import load_config

def get_client():
    """Cria cliente MinIO com base nas configurações atuais"""
    cfg = load_config()
    endpoint = f"localhost:{cfg.get('minio_port', 9000)}"
    return Minio(
        endpoint,
        access_key=cfg.get("access_key", "minioadmin"),
        secret_key=cfg.get("secret_key", "minioadmin"),
        secure=False
    )

def list_buckets():
    """Lista todos os buckets disponíveis"""
    client = get_client()
    buckets = client.list_buckets()
    return [b.name for b in buckets]

def create_bucket(bucket_name):
    """Cria um novo bucket se não existir"""
    client = get_client()
    if client.bucket_exists(bucket_name):
        return {"ok": False, "message": "Bucket já existe"}
    client.make_bucket(bucket_name)
    return {"ok": True, "message": f"Bucket '{bucket_name}' criado com sucesso"}

def delete_bucket(bucket_name):
    """Remove bucket se estiver vazio"""
    client = get_client()
    if not client.bucket_exists(bucket_name):
        return {"ok": False, "message": "Bucket não encontrado"}

    objs = list(client.list_objects(bucket_name, recursive=True))
    if objs:
        return {"ok": False, "message": "Bucket não está vazio"}

    client.remove_bucket(bucket_name)
    return {"ok": True, "message": f"Bucket '{bucket_name}' removido"}

def rename_bucket(old_name, new_name):
    """Renomeia um bucket copiando conteúdo"""
    client = get_client()
    if not client.bucket_exists(old_name):
        return {"ok": False, "message": "Bucket original não existe"}
    if client.bucket_exists(new_name):
        return {"ok": False, "message": "Novo nome já existe"}

    client.make_bucket(new_name)
    for obj in client.list_objects(old_name, recursive=True):
        client.copy_object(
            new_name,
            obj.object_name,
            f"/{old_name}/{obj.object_name}"
        )
    for obj in client.list_objects(old_name, recursive=True):
        client.remove_object(old_name, obj.object_name)
    client.remove_bucket(old_name)
    return {"ok": True, "message": f"Bucket renomeado de '{old_name}' para '{new_name}'"}
