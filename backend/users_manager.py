import os, json
from utils.hashing import hash_password, verify_password
import jwt, datetime

USERS_FILE = os.path.abspath("backend/users.json")

# Usuário padrão (criado se não existir arquivo)
DEFAULT_USERS = [
    {
        "username": "admin",
        "password_hash": hash_password("admin123"),
        "role": "admin"
    }
]

def load_users():
    """Carrega lista de usuários"""
    if os.path.exists(USERS_FILE):
        try:
            with open(USERS_FILE, "r", encoding="utf-8") as f:
                users = json.load(f)
                return users
        except Exception:
            pass
    save_users(DEFAULT_USERS)
    return DEFAULT_USERS.copy()

def save_users(users):
    """Salva usuários no arquivo"""
    os.makedirs(os.path.dirname(USERS_FILE), exist_ok=True)
    with open(USERS_FILE, "w", encoding="utf-8") as f:
        json.dump(users, f, indent=2)

def authenticate(username, password):
    """Verifica login de um usuário"""
    users = load_users()
    for user in users:
        if user["username"] == username and verify_password(password, user["password_hash"]):
            return {"username": user["username"], "role": user.get("role", "user")}
    return None

def add_user(username, password, role="user"):
    """Adiciona novo usuário"""
    users = load_users()
    if any(u["username"] == username for u in users):
        return {"status": "error", "message": "Usuário já existe"}
    users.append({
        "username": username,
        "password_hash": hash_password(password),
        "role": role
    })
    save_users(users)
    return {"status": "success", "message": f"Usuário '{username}' criado com sucesso"}

def remove_user(username):
    """Remove um usuário"""
    users = load_users()
    updated = [u for u in users if u["username"] != username]
    if len(updated) == len(users):
        return {"status": "error", "message": "Usuário não encontrado"}
    save_users(updated)
    return {"status": "success", "message": f"Usuário '{username}' removido"}

def change_password(username, new_password):
    """Altera a senha de um usuário"""
    users = load_users()
    for user in users:
        if user["username"] == username:
            user["password_hash"] = hash_password(new_password)
            save_users(users)
            return {"status": "success", "message": "Senha atualizada com sucesso"}
    return {"status": "error", "message": "Usuário não encontrado"}

# ---------------- JWT AUTH ----------------

SECRET_KEY = os.environ.get("SECRET_KEY", "mini-cloud-secret")

def create_token(username):
    """Cria um token JWT válido por 8 horas"""
    payload = {
        "username": username,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=8)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def validate_token(token):
    """Valida e decodifica um token JWT"""
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return {"username": data["username"]}
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def get_user(username):
    """Retorna um usuário pelo nome"""
    users = load_users()
    for u in users:
        if u["username"] == username:
            return u
    return None

def find_user(username):
    """Alias de get_user para compatibilidade"""
    return get_user(username)