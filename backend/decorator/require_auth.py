from functools import wraps
from flask import request, jsonify
import users_manager

def require_auth(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        auth = request.headers.get("Authorization","")
        if auth.startswith("Bearer "):
            token = auth.split(" ",1)[1]
            info = users_manager.validate_token(token)
            if info:
                request.user = info["username"]
                return f(*args, **kwargs)
        return jsonify({"ok": False, "message": "unauthorized"}), 401
    return wrapped
