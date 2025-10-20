from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from minio import Minio
import os, psutil, json

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

@app.route("/api/stats", methods=["GET"])
def get_stats():
    total, used, free = psutil.disk_usage(".")
    return jsonify({
        "total_gb": round(total / (1024**3), 2),
        "used_gb": round(used / (1024**3), 2),
        "free_gb": round(free / (1024**3), 2)
    })

if __name__ == "__main__":
    app.run(port=8080)
