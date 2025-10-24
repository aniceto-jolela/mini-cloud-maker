import subprocess, psutil, os, signal, platform, time
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
    """Inicia o servidor MinIO local usando as configurações do config.json"""
    global MINIO_PROCESS, MINIO_PORT

    if is_minio_running():
        return {"status": "already_running"}

    cfg = config_manager.load_config()
    port = int(cfg.get("minio_port", 9000))
    access_key = cfg.get("access_key", "minioadmin")
    secret_key = cfg.get("secret_key", "minioadmin")
    storage_path = os.path.abspath(cfg.get("storage_path", "data"))

    os.makedirs(storage_path, exist_ok=True)

    system = platform.system().lower()
    exe_path = os.path.abspath(
        "backend/storage/minio.exe" if system == "windows" else "backend/storage/minio"
    )

    if not os.path.exists(exe_path):
        return {"status": "error", "message": f"MinIO executável não encontrado em {exe_path}"}

    env = os.environ.copy()
    env["MINIO_ROOT_USER"] = access_key
    env["MINIO_ROOT_PASSWORD"] = secret_key

    console_port = port + 1
    MINIO_PORT = port

    try:
        MINIO_PROCESS = subprocess.Popen(
            [exe_path, "server", storage_path, "--address", f":{port}", "--console-address", f":{console_port}"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            env=env,
            cwd=os.path.dirname(exe_path)
        )
        time.sleep(1.5)
        if is_minio_running():
            return {"status": "started", "port": port, "console_port": console_port}
        else:
            return {"status": "error", "message": "Falha ao iniciar o MinIO."}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def stop_minio():
    """Encerra o processo MinIO"""
    global MINIO_PROCESS

    stopped = False

    if MINIO_PROCESS is not None:
        try:
            if MINIO_PROCESS.poll() is None:
                MINIO_PROCESS.terminate()
                MINIO_PROCESS.wait(timeout=5)
            stopped = True
        except Exception:
            try:
                MINIO_PROCESS.kill()
                stopped = True
            except Exception:
                pass
        finally:
            MINIO_PROCESS = None

    # Se ainda houver instância rodando, tenta matar via psutil
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            cmd = proc.info.get('cmdline') or []
            exe_name = os.path.basename(cmd[0]).lower() if cmd else ""
            if exe_name in ('minio', 'minio.exe') or exe_name.endswith('minio'):
                proc.kill()
                stopped = True
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue

    return {"status": "stopped" if stopped else "not_running"}
