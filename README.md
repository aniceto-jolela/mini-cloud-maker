[![visual studio code](https://img.shields.io/badge/ide-visual_studio_code_1.103.2-purple)](https://code.visualstudio.com/download)
[![nodejs](https://img.shields.io/badge/nodejs-24.7.0-blue)](https://nodejs.org/en/download/current)
[![npm](https://img.shields.io/badge/npm-11.5.1-blue)](https://nodejs.org/en/download/current)
[![flask](https://img.shields.io/badge/flask-blue)](https://flask.palletsprojects.com/en/stable/installation/)

# Mini Cloud Maker
***MVP v1.3***

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

🧩 2. Estrutura Geral do Sistema v1.3
````
MiniCloudMaker/
│
├── backend/
│   ├── data/
│   |   ├── status.json
│   |   ├── .minio.sys/
|   |   └── meu-bucket/
│   ├── server.py              → API local Flask
│   ├── minio_manager.py       → Controle do MinIO
│   ├── config_manager.py      
│   ├── config.json            → arquivo de configuração persistente
│   └── storage/               → Dados e binário do MinIO
│
├── frontend/                  → Projeto React + Vite
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── components/
│       │   ├── FileUpload.jsx
│       │   ├── FileList.jsx
|       │   ├── StatsPanel.jsx
│       |   ├── SettingsPanel.jsx
|       │   └── MinioControl.jsx 
│       └── api.js             → Comunicação com o backend Flask
│
├── electron/
│   ├── main.js             → Inicia o app Electron e o backend Python
│   ├── preload.js          → Comunicação segura com o frontend
│   └── package.json        → Configuração do app desktop
│
├── installer/
│   └── setup_minio.py         → Baixa e inicia o MinIO localmente
│
├── app.py                     → Inicializador geral (backend + frontend)
└── README.md

````
