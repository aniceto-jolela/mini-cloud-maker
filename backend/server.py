from flask import Flask, request, jsonify
from flask_cors import CORS
from config_manager import load_config, save_config
from minio_manager import start_minio, stop_minio, is_minio_running
from status_manager import get_storage_status, update_history, get_history
import threading, time

app = Flask(__name__)
CORS(app)

# -------------------------------------------------------
# AUTO START - Verifica se o MinIO deve iniciar sozinho
# -------------------------------------------------------
def auto_start_minio():
    config = load_config()
    if config.get("auto_start", False):
        print("[Mini Cloud Maker] Auto Start ativado. Iniciando MinIO...")
        start_minio()
    else:
        print("[Mini Cloud Maker] Auto Start desativado.")

# Executa o auto start em thread separada
threading.Thread(target=auto_start_minio, daemon=True).start()
# -------------------------------------------------------

# ---------------- CONFIGURAÇÕES ----------------

@app.route("/api/config", methods=["GET", "POST"])
def api_config():
    if request.method == "GET":
        return jsonify(load_config())
    else:
        data = request.json
        save_config(data)
        return jsonify({"message": "Configurações salvas com sucesso!"})

@app.route("/api/config/reset", methods=["POST"])
def api_reset_config():
    from config_manager import reset_config
    data = reset_config()
    return jsonify({
        "message": "Configurações restauradas para os padrões!",
        "config": data
    })

# ---------------- MINIO CONTROL ----------------

@app.route("/api/minio/start", methods=["POST"])
def minio_start():
    result = start_minio()
    return jsonify({"message": result})

@app.route("/api/minio/stop", methods=["POST"])
def minio_stop():
    result = stop_minio()
    return jsonify({"message": result})

@app.route("/api/minio/status", methods=["GET"])
def minio_status():
    return jsonify({
        "running": is_minio_running(),
        "status": get_storage_status()
    })
# ---------------- ESTATÍSTICAS ----------------

@app.route("/api/status/current", methods=["GET"])
def status_current():
    stat = update_history()
    return jsonify(stat)

@app.route("/api/status/history", methods=["GET"])
def status_history():
    return jsonify(get_history())

if __name__ == "__main__":
    app.run(port=8080)