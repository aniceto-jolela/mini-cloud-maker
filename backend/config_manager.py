import os, json

CONFIG_PATH = os.path.abspath("backend/config.json")

DEFAULT_CONFIG = {
    "minio_port": 9000,
    "bucket_name": "default",
    "access_key": "minioadmin",
    "secret_key": "minioadmin",
    "auto_start": False
}

def load_config():
    """Lê o arquivo config.json, cria se não existir"""
    if not os.path.exists(CONFIG_PATH):
        save_config(DEFAULT_CONFIG)
        return DEFAULT_CONFIG
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return DEFAULT_CONFIG

def save_config(data):
    """Salva as configurações"""
    with open(CONFIG_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    return data
