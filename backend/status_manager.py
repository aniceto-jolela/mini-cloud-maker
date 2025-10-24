import os, psutil, time, json

DATA_DIR = os.path.abspath("backend/data")
STATS_FILE = os.path.join(DATA_DIR, "status.json")

os.makedirs(DATA_DIR, exist_ok=True)

def get_storage_status():
    """Obtém estatísticas do uso de disco e arquivos"""
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

# -----------------------------------------------------------
# Persistência de histórico
# -----------------------------------------------------------
# Será salvo no JSON: |
# =================== |
# Upload/download muda o uso em +1%	
# Novo arquivo adicionado/removido
# Sem alteração por 5 minutos
# Nenhuma mudança recente - Não grava

def load_history():
    """Carrega histórico salvo"""
    if os.path.exists(STATS_FILE):
        try:
            with open(STATS_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                if isinstance(data, list):
                    return data
        except:
            pass
    return []

def save_history(history):
    """Salva histórico no arquivo JSON"""
    with open(STATS_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2)

# Histórico em memória
status_history = load_history()
last_save_time = 0

def update_history():
    """Atualiza o histórico apenas se houver mudança relevante"""
    global last_save_time

    current = get_storage_status()
    now = time.time()
    should_save = False

    if status_history:
        last = status_history[-1]
        diff_percent = abs(current["used_percent"] - last["used_percent"])
        diff_files = abs(current["total_files"] - last["total_files"])
        time_diff = now - last_save_time

        # Critérios de atualização
        if diff_percent >= 1 or diff_files >= 1 or time_diff >= 300:
            should_save = True
    else:
        should_save = True  # primeira vez

    if should_save:
        status_history.append(current)
        if len(status_history) > 100:
            status_history.pop(0)
        save_history(status_history)
        last_save_time = now

    return current

def get_history():
    """Retorna o histórico completo"""
    return status_history
