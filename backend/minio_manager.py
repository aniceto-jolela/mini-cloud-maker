import subprocess, psutil, os, signal, platform

MINIO_PROCESS = None
MINIO_PORT = 9000

def is_minio_running():
    """Verifica se o MinIO já está ativo"""
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        if proc.info['name'] and "minio" in proc.info['name'].lower():
            return True
    return False

def start_minio():
    """Inicia o servidor MinIO local"""
    global MINIO_PROCESS

    if is_minio_running():
        return "already_running"

    system = platform.system().lower()
    exe_path = os.path.abspath("backend/storage/minio.exe" if system == "windows" else "backend/storage/minio")

    if not os.path.exists(exe_path):
        return "not_found"

    data_dir = os.path.abspath("backend/data")
    os.makedirs(data_dir, exist_ok=True)

    MINIO_PROCESS = subprocess.Popen(
        [exe_path, "server", data_dir, "--console-address", ":9001"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    return "started"

def stop_minio():
    """Encerra o processo MinIO"""
    for proc in psutil.process_iter(['pid', 'name']):
        if proc.info['name'] and "minio" in proc.info['name'].lower():
            proc.kill()
            return "stopped"
    return "not_running"
