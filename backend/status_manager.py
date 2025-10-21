import os, psutil, time

DATA_DIR = os.path.abspath("backend/data")

def get_storage_status():
    """Obtém estatísticas do uso de disco e arquivos"""
    os.makedirs(DATA_DIR, exist_ok=True)

    usage  = psutil.disk_usage(DATA_DIR)
    files = sum(len(files) for _, _, files in os.walk(DATA_DIR))
    percent = round(usage.percent, 2)

    return {
        "total_space_gb": round(usage.total / (1024**3), 2),
        "used_space_gb": round(usage.used / (1024**3), 2),
        "used_percent": percent,
        "free_space_gb": round(usage.free / (1024**3), 2),
        "total_files": files,
        "timestamp": int(time.time())
    }

# Histórico temporário (mantido em memória)
status_history = []

def update_history():
    """Atualiza o histórico de uso"""
    stat = get_storage_status()
    status_history.append(stat)
    if len(status_history) > 20:  # guarda os últimos 20 registros
        status_history.pop(0)
    return stat

def get_history():
    """Retorna o histórico completo"""
    return status_history
