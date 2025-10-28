import os
from flask import Blueprint, jsonify, request
import config_manager
import minio_manager

storage_bp = Blueprint("storage_bp", __name__)

@storage_bp.route("/get_storage_path", methods=["GET"])
def get_storage_path():
    """Retorna o diretório atual de armazenamento"""
    cfg = config_manager.load_config()
    return jsonify({"storage_path": os.path.abspath(cfg.get("storage_path", "data"))})


@storage_bp.route("/set_storage_path", methods=["POST"])
def set_storage_path():
    """Define um novo diretório de armazenamento"""
    data = request.get_json(force=True)
    new_path = data.get("path")

    if not new_path:
        return jsonify({"status": "error", "message": "Nenhum caminho fornecido"}), 400

    new_path = os.path.abspath(new_path)
    os.makedirs(new_path, exist_ok=True)

    cfg = config_manager.load_config()
    cfg["storage_path"] = new_path
    config_manager.save_config(cfg)

    # Reinicia o MinIO automaticamente se estiver em execução
    if minio_manager.is_minio_running():
        minio_manager.stop_minio()
        minio_manager.start_minio()

    return jsonify({"status": "success", "storage_path": new_path})
