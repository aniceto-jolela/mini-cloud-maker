from flask import Flask, request, jsonify
from flask_cors import CORS
from config_manager import load_config, save_config
from minio_manager import start_minio, stop_minio, is_minio_running
from status_manager import get_storage_status, update_history, get_history
from api_storage_path import storage_bp
import threading, time
import buckets.buckets_manager as buckets_manager
import buckets.file_manager as file_manager


import users_manager, logs_manager
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

# ---------------- BUCKET MANAGEMENT ----------------
@app.route("/api/buckets", methods=["GET"])
@require_auth
def api_list_buckets():
    try:
        buckets = buckets_manager.list_buckets()
        return jsonify({"ok": True, "buckets": buckets})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

@app.route("/api/buckets", methods=["POST"])
@require_auth
def api_create_bucket():
    data = request.json or {}
    name = data.get("name")
    if not name:
        return jsonify({"ok": False, "message": "Nome obrigatório"}), 400
    result = buckets_manager.create_bucket(name)
    return jsonify(result)

@app.route("/api/buckets/<bucket_name>", methods=["DELETE"])
@require_auth
def api_delete_bucket(bucket_name):
    result = buckets_manager.delete_bucket(bucket_name)
    return jsonify(result)

@app.route("/api/buckets/rename", methods=["POST"])
@require_auth
def api_rename_bucket():
    data = request.json or {}
    old = data.get("old_name")
    new = data.get("new_name")
    if not old or not new:
        return jsonify({"ok": False, "message": "Parâmetros inválidos"}), 400
    result = buckets_manager.rename_bucket(old, new)
    return jsonify(result)

# ---------------- FILE MANAGEMENT ----------------
@app.route("/api/files/<bucket>", methods=["GET"])
@require_auth
def api_list_files(bucket):
    try:
        files = file_manager.list_files(bucket)
        return jsonify({"ok": True, "files": files})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

@app.route("/api/files/<bucket>/upload", methods=["POST"])
@require_auth
def api_upload_file(bucket):
    if "file" not in request.files:
        return jsonify({"ok": False, "message": "Nenhum arquivo enviado"}), 400
    file = request.files["file"]
    try:
        res = file_manager.upload_file(bucket, file.stream, file.filename)
        return jsonify(res)
    except Exception as e:
        return jsonify({"ok": False, "message": str(e)}), 500

@app.route("/api/files/<bucket>/<filename>", methods=["DELETE"])
@require_auth
def api_delete_file(bucket, filename):
    res = file_manager.delete_file(bucket, filename)
    return jsonify(res)

@app.route("/api/files/<bucket>/<filename>/download", methods=["GET"])
@require_auth
def api_download_file(bucket, filename):
    return file_manager.download_file(bucket, filename)

# ---------------- SHARE LINK (PRESIGNED) ----------------
@app.route("/api/files/<bucket>/<filename>/share", methods=["POST"])
@require_auth
def api_generate_share_link(bucket, filename):
    data = request.json or {}
    expires_in = int(data.get("expires_in", 300))
    link = file_manager.generate_temporary_link(bucket, filename, expires_in)
    return jsonify({"ok": True, "link": link, "expires_in": expires_in})

@app.route("/api/share/<bucket>/<filename>", methods=["GET"])
def api_access_shared_file(bucket, filename):
    exp = request.args.get("exp")
    sig = request.args.get("sig")
    if not (exp and sig):
        return jsonify({"ok": False, "message": "invalid"}), 400
    if not file_manager.validate_temporary_link(bucket, filename, exp, sig):
        return jsonify({"ok": False, "message": "expired or invalid"}), 403
    return file_manager.download_file(bucket, filename)

@app.route("/api/share/active", methods=["GET"])
@require_auth
def api_get_active_links():
    links = file_manager.get_active_links()
    return jsonify({"ok": True, "links": links})

@app.route("/api/share/<sig>/cancel", methods=["POST"])
@require_auth
def api_cancel_share(sig):
    ok = file_manager.deactivate_link(sig)
    return jsonify({"ok": ok})

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