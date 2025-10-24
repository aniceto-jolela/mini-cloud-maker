import subprocess, psutil, os, signal, platform
import config_manager

MINIO_PROCESS = None
MINIO_PORT = None

def is_minio_running():
    """Verifica se o MinIO já está ativo"""
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            if proc.pid == os.getpid():
                continue
            cmd = proc.info.get('cmdline') or []
            if cmd:
                exe_name = os.path.basename(cmd[0]).lower()
                if exe_name in ('minio', 'minio.exe') or exe_name.endswith('minio'):
                    return True
            else:
                name = proc.info.get('name') or ""
                if "minio" in name.lower():
                    return True
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue
    return False

def start_minio():
    """Inicia o servidor MinIO local usando configurações de config.json"""
    global MINIO_PROCESS, MINIO_PORT

    if is_minio_running():
        return "already_running"

    # carrega configurações (usa defaults se necessário)
    cfg = config_manager.load_config()
    port = int(cfg.get("minio_port", 9000))
    access_key = cfg.get("access_key", "minioadmin")
    secret_key = cfg.get("secret_key", "minioadmin")

    MINIO_PORT = port

    system = platform.system().lower()
    exe_path = os.path.abspath("backend/storage/minio.exe" if system == "windows" else "backend/storage/minio")

    if not os.path.exists(exe_path):
        return "not_found"

    data_dir = os.path.abspath("backend/data")
    os.makedirs(data_dir, exist_ok=True)

    # prepara variáveis de ambiente para o processo MinIO
    env = os.environ.copy()
    env["MINIO_ROOT_USER"] = access_key
    env["MINIO_ROOT_PASSWORD"] = secret_key

    console_port = port + 1  # console em porta seguinte por conveniência
    # usa DEVNULL para stdout/stderr para evitar bloqueio se ninguém ler os pipes
    MINIO_PROCESS = subprocess.Popen(
        [exe_path, "server", data_dir, "--address", f":{port}", "--console-address", f":{console_port}"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        env=env
    )
    return "started"

def stop_minio():
    """Encerra o processo MinIO"""
    global MINIO_PROCESS
    # tenta parar processo iniciado por este módulo primeiro
    if MINIO_PROCESS is not None:
        try:
            if MINIO_PROCESS.poll() is None:
                MINIO_PROCESS.terminate()
                try:
                    MINIO_PROCESS.wait(timeout=5)
                except Exception:
                    MINIO_PROCESS.kill()
            MINIO_PROCESS = None
            return "stopped"
        except Exception:
            MINIO_PROCESS = None
            # continua para tentativa via psutil

    # fallback: procura executável minio (evita corresponder ao próprio script)
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            if proc.pid == os.getpid():
                continue
            cmd = proc.info.get('cmdline') or []
            exe_name = os.path.basename(cmd[0]).lower() if cmd else ""
            if exe_name in ('minio', 'minio.exe') or exe_name.endswith('minio'):
                try:
                    proc.kill()
                except Exception:
                    pass
                return "stopped"
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue
    return "not_running"