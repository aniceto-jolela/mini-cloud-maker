[![visual studio code](https://img.shields.io/badge/ide-visual_studio_code_1.103.2-purple)](https://code.visualstudio.com/download)
[![nodejs](https://img.shields.io/badge/nodejs-24.7.0-blue)](https://nodejs.org/en/download/current)
[![npm](https://img.shields.io/badge/npm-11.5.1-blue)](https://nodejs.org/en/download/current)
[![flask](https://img.shields.io/badge/flask-blue)](https://flask.palletsprojects.com/en/stable/installation/)

# Mini Cloud Maker
***MVP v1.6***

***🧠 Mensagem-chave do Mini Cloud Maker***

> ***“Sua nuvem. Seu computador. Seus dados.”
> Um software que devolve o controle e a privacidade para o usuário,
> e ainda dá lucro para você como criador.***

## 1. Objetivo do MVP

Permitir que qualquer pessoa crie sua própria **mini nuvem** local com MinIO — sem terminal, sem complicação — apenas clicando em **Instalar e Iniciar**.

#### MVP:

- Instalar o MinIO automaticamente (ou detectar se já existe);
- Fornecer uma interface gráfica (Dashboard);
- Permitir login, upload, download e exclusão de arquivos;
- Exibir estatísticas básicas de uso;
- Funcionar 100% offline.

#### Modulos (plataforma de mini-SaaS locais)
1. 🧰 Oficina (reparos e relatórios)
2. 🎥 Estúdio de mídia (armazenamento e entrega de fotos/vídeos)
3. 📂 Backup local automático
4. 📦 Gestão de arquivos para empresas
5. Sistema de Vistoria
6. Controlo de Qualidade
7. Testador de Webhooks
8. Inspector Escolar
9. Gestor de Obras


## 2. Estrutura Geral do Sistema v1.6
````
MiniCloudMaker/
│
│ ├── minio_manager.py # Start/stop, presigned links, healthchecks
│ ├── db/ # Adaptador/abstração para storage (JSON ou SQLite)
│ │ ├── store.py # API unificada (get, put, query, migrate)
│ │ ├── json_store.py
│ │ └── sqlite_store.py
│ ├── modules/ # Cada módulo em subpasta
│ │ ├── __init__.py
│ │ └── oficina/
│ │ ├── oficina_routes.py
│ │ ├── oficina_manager.py
│ │ ├── pdf_generator.py
│ │ └── schema.json
│ ├── shared_links.json
│ ├── users.json
│ ├── logs_manager.py
│ ├── utils/
│ │ ├── hashing.py
│ │ ├── validators.py
│ │ └── helpers.py
│ └── storage/ # Binário do minio, dados do minio local
│ ├── minio.exe
│ └── data/
│
├── frontend/
│ ├── package.json
│ ├── vite.config.js
│ ├── src/
│ │ ├── main.jsx
│ │ ├── app.jsx
│ │ ├── routes.jsx
│ │ ├── services/api.js # Comunicação com backend
│ │ ├── modules/ # Frontend modules
│ │ │ └── oficina/
│ │ │ ├── OficinaDashboard.jsx
│ │ │ ├── UploadFotos.jsx
│ │ │ ├── ClienteForm.jsx
│ │ │ ├── RelatorioPreview.jsx
│ │ │ └── oficinaApi.js
│ │ └── components/ # Reutilizáveis
│ │ ├── Header.jsx
│ │ ├── Sidebar.jsx
│ │ └── FileListWithAction.jsx
│ └── public/
│
├── electron/
│ ├── main.js
│ └── preload.js
│
├── installer/
│ ├── setup_minio.py
│ └── installer_docs.md
│
├── scripts/
│ ├── migrate_json_to_sqlite.py
│ └── build_release.sh
│
├── CONFIG.md
└── README.md

````
