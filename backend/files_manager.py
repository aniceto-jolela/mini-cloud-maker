from minio import Minio
import os, time
from config_manager import load_config

def get_minio_client():
    cfg = load_config()
    endpoint = f"localhost:{cfg.get('minio_port',9000)}"
    access = cfg.get("access_key")
    secret = cfg.get("secret_key")
    return Minio(endpoint, access_key=access, secret_key=secret, secure=False)

def ensure_bucket(bucket_name):
    client = get_minio_client()
    if not client.bucket_exists(bucket_name):
        client.make_bucket(bucket_name)

def list_objects(bucket_name):
    client = get_minio_client()
    return [obj.object_name for obj in client.list_objects(bucket_name)]

def delete_object(bucket_name, object_name):
    client = get_minio_client()
    client.remove_object(bucket_name, object_name)

def rename_object(bucket_name, src, dst):
    client = get_minio_client()
    client.copy_object(bucket_name, dst, f"/{bucket_name}/{src}")
    client.remove_object(bucket_name, src)

def set_object_metadata(bucket_name, object_name, metadata: dict):
    client = get_minio_client()
    obj = client.stat_object(bucket_name, object_name)
    client.copy_object(bucket_name, object_name, f"/{bucket_name}/{object_name}", metadata=metadata, metadata_directive="REPLACE")

def presigned_url(bucket_name, object_name, expires_seconds=3600):
    client = get_minio_client()
    return client.presigned_get_object(bucket_name, object_name, expires=expires_seconds)
