from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from minio import Minio
import os, psutil, json
from minio_manager import start_minio, stop_minio, is_minio_running
from status_manager import get_storage_status, update_history, get_history

app = Flask(__name__)
CORS(app)

# Configuração inicial
MINIO_URL = "localhost:9000"
ACCESS_KEY = "minioadmin"
SECRET_KEY = "minioadmin"
BUCKET_NAME = "meu-bucket"

# Cliente MinIO
client = Minio(MINIO_URL, access_key=ACCESS_KEY, secret_key=SECRET_KEY, secure=False)

# Garante o bucket
if not client.bucket_exists(BUCKET_NAME):
    client.make_bucket(BUCKET_NAME)

with open("backend/config.json", "r") as f:
    CONFIG = json.load(f)

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    if not data:
        return jsonify({"success": False, "error": "Nenhum dado enviado"}), 400
    username = data.get("username")
    password = data.get("password")

    if username == CONFIG["username"] and password == CONFIG["password"]:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "error": "Credenciais inválidas"}), 401

@app.route("/api/upload", methods=["POST"])
def upload_file():
    file = request.files["file"]
    client.put_object(BUCKET_NAME, file.filename, file, length=-1, part_size=10*1024*1024)
    return jsonify({"status": "ok", "message": f"{file.filename} enviado!"})

@app.route("/api/download/<filename>", methods=["GET"])
def download_file(filename):
    response = client.get_object(BUCKET_NAME, filename)
    with open(filename, "wb") as f:
        for d in response.stream(32*1024):
            f.write(d)
    return send_file(filename, as_attachment=True)

@app.route("/api/delete/<filename>", methods=["DELETE"])
def delete_file(filename):
    client.remove_object(BUCKET_NAME, filename)
    return jsonify({"status": "ok", "message": f"{filename} removido!"})

@app.route("/api/status", methods=["GET"])
def get_stats():
    usage = psutil.disk_usage(".")
    return jsonify({
        "total_space_gb": round(usage.total / (1024**3), 2),
        "used_space_gb": round(usage.used / (1024**3), 2),
        "free_space_gb": round(usage.free / (1024**3), 2),
        "used_percent": usage.percent
    })

# Minio
@app.route("/api/minio/status", methods=["GET"])
def minio_status():
    running = is_minio_running()
    return jsonify({"running": running})

@app.route("/api/minio/start", methods=["POST"])
def minio_start():
    result = start_minio()
    return jsonify({"status": result})

@app.route("/api/minio/stop", methods=["POST"])
def minio_stop():
    result = stop_minio()
    return jsonify({"status": result})

# Status
@app.route("/api/status/current", methods=["GET"])
def stats_current():
    stat = update_history()
    return jsonify(stat)

@app.route("/api/status/history", methods=["GET"])
def stats_history():
    return jsonify(get_history())

if __name__ == "__main__":
    app.run(port=8080)
