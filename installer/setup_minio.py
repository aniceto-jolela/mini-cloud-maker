import os, platform, urllib.request, zipfile, subprocess

def install_minio():
    system = platform.system().lower()
    if system == "windows":
        url = "https://dl.min.io/server/minio/release/windows-amd64/minio.exe"
        dest = "backend/storage/minio.exe"
    else:
        url = "https://dl.min.io/server/minio/release/linux-amd64/minio"
        dest = "backend/storage/minio"

    if not os.path.exists(dest):
        print("Baixando MinIO...")
        urllib.request.urlretrieve(url, dest)
        os.chmod(dest, 0o755)
        print("MinIO instalado com sucesso!")

    # Inicia o MinIO
    print("Iniciando MinIO...")
    subprocess.Popen([dest, "server", "backend/data", "--console-address", ":9001"])

if __name__ == "__main__":
    install_minio()
