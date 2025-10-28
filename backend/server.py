from flask import Flask, request, jsonify
from flask_cors import CORS
from config_manager import load_config, save_config
from minio_manager import start_minio, stop_minio, is_minio_running
from status_manager import get_storage_status, update_history, get_history
from api_storage_path import storage_bp
import threading, time

import users_manager, logs_manager, files_manager
from decorator.require_auth import require_auth

app = Flask(__name__)
CORS(app)
app.register_blueprint(storage_bp, url_prefix="/api")

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

# ---------------- LOGIN / AUTENTICAÇÃO ----------------
@app.route("/api/auth/login", methods=["POST"])
def api_login():
    data = request.json or {}
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"ok": False, "message": "username/password required"}), 400

    user = users_manager.authenticate(username, password)
    if user:
        token = users_manager.create_token(username)
        return jsonify({"ok": True, "token": token, "role": user.get("role")})
    else:
        return jsonify({"ok": False, "message": "invalid credentials"}), 401

# ---------------- USERS ----------------
@app.route("/api/users", methods=["GET"])
@require_auth
def api_list_users():
    current_user = request.user
    u = users_manager.get_user(current_user)
    if not u or u.get("role") != "admin":
        return jsonify({"ok": False, "message": "forbidden"}), 403

    users = users_manager.load_users()
    return jsonify({"ok": True, "users": [
        {"username": x["username"], "role": x.get("role", "user")} for x in users
    ]})

@app.route("/api/users", methods=["POST"])
@require_auth
def api_create_user():
    current_user = request.user
    u = users_manager.get_user(current_user)
    if not u or u.get("role") != "admin":
        return jsonify({"ok": False, "message": "forbidden"}), 403

    data = request.json or {}
    result = users_manager.add_user(
        data.get("username"), data.get("password"), data.get("role", "user")
    )
    return jsonify(result)

@app.route("/api/users/<username>", methods=["DELETE"])
@require_auth
def api_delete_user(username):
    current_user = request.user
    u = users_manager.get_user(current_user)
    if not u or u.get("role") != "admin":
        return jsonify({"ok": False, "message": "forbidden"}), 403

    result = users_manager.remove_user(username)
    return jsonify(result)

@app.route("/api/users/password", methods=["POST"])
@require_auth
def api_change_password():
    data = request.json or {}
    new_pass = data.get("new_password")
    if not new_pass:
        return jsonify({"ok": False, "message": "new_password required"}), 400

    result = users_manager.change_password(request.user, new_pass)
    return jsonify(result)

# ---------------- FILE OPERATIONS ----------------
@app.route("/api/files/<bucket>/list", methods=["GET"])
@require_auth
def api_list(bucket):
    try:
        files_manager.ensure_bucket(bucket)
        objs = files_manager.list_objects(bucket)
        return jsonify({"ok":True, "files": objs})
    except Exception as e:
        return jsonify({"ok":False, "error": str(e)}), 500

@app.route("/api/files/<bucket>/delete", methods=["POST"])
@require_auth
def api_delete(bucket):
    data = request.json or {}
    obj = data.get("object")
    try:
        files_manager.delete_object(bucket, obj)
        logs_manager.log_event("delete", request.user, {"bucket":bucket,"object":obj})
        return jsonify({"ok":True})
    except Exception as e:
        return jsonify({"ok":False,"error":str(e)}), 500

@app.route("/api/files/<bucket>/rename", methods=["POST"])
@require_auth
def api_rename(bucket):
    data = request.json or {}
    src = data.get("src")
    dst = data.get("dst")
    try:
        files_manager.rename_object(bucket, src, dst)
        logs_manager.log_event("rename", request.user, {"bucket":bucket,"src":src,"dst":dst})
        return jsonify({"ok":True})
    except Exception as e:
        return jsonify({"ok":False,"error":str(e)}), 500

@app.route("/api/files/<bucket>/metadata", methods=["POST"])
@require_auth
def api_metadata(bucket):
    data = request.json or {}
    obj = data.get("object")
    metadata = data.get("metadata", {})
    try:
        files_manager.set_object_metadata(bucket, obj, metadata)
        logs_manager.log_event("set_metadata", request.user, {"bucket":bucket,"object":obj,"metadata":metadata})
        return jsonify({"ok":True})
    except Exception as e:
        return jsonify({"ok":False,"error":str(e)}), 500

# ---------------- SHARE LINK (PRESIGNED) ----------------
@app.route("/api/files/<bucket>/share", methods=["POST"])
@require_auth
def api_share(bucket):
    data = request.json or {}
    obj = data.get("object")
    expires = int(data.get("expires", 3600))
    try:
        url = files_manager.presigned_url(bucket, obj, expires_seconds=expires)
        logs_manager.log_event("share", request.user, {"bucket":bucket,"object":obj,"expires":expires})
        return jsonify({"ok":True, "url": url})
    except Exception as e:
        return jsonify({"ok":False,"error":str(e)}), 500

# ---------------- LOGS ENDPOINTS ----------------
@app.route("/api/logs", methods=["GET"])
@require_auth
def api_get_logs():
    current = request.user
    u = users_manager.find_user(current)
    if not u or u.get("role") != "admin":
        return jsonify({"ok":False,"message":"forbidden"}),403
    events = logs_manager.load_events()
    return jsonify({"ok":True, "events": events})


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