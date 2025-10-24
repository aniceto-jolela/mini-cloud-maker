import os, json

CONFIG_FILE = os.path.abspath("backend/config.json")

DEFAULT_CONFIG = {
    "minio_port": 9000,
    "access_key": "minioadmin",
    "secret_key": "minioadmin",
    "bucket_name": "default",
    "storage_path": "data",       
    "auto_start": False
}

def load_config():
    """Lê o arquivo config.json; cria ou corrige se necessário"""
    config = DEFAULT_CONFIG.copy()

    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
            config.update({**config, **data})
        except Exception as e:
            print(f"[WARN] Falha ao ler config.json: {e}")
            save_config(config)
            return config
    else:
        save_config(config)

    os.makedirs(config["storage_path"], exist_ok=True)

    return config


def save_config(config):
    """Salva as configurações em disco"""
    try:
        os.makedirs(os.path.dirname(CONFIG_FILE), exist_ok=True)
        with open(CONFIG_FILE, "w", encoding="utf-8") as f:
            json.dump(config, f, indent=2)
        return True
    except Exception as e:
        print(f"[ERROR] Falha ao salvar config.json: {e}")
        return False


def reset_config():
    """Restaura as configurações padrão"""
    save_config(DEFAULT_CONFIG.copy())
    os.makedirs(DEFAULT_CONFIG["storage_path"], exist_ok=True)
    return DEFAULT_CONFIG.copy()
