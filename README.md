# Mini Cloud Maker
***MVP v1.0***

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

🧩 2. Estrutura Geral do Sistema
````
Mini Cloud Maker/
│
├── backend/             # API local + gerenciamento do MinIO
│   ├── server.js        # Node.js + Express
│   ├── minio.js         # Conexão e operações com MinIO
│   ├── config.json      # Configurações locais
│   └── auth/            # Autenticação local (JWT + bcrypt)
│
├── frontend/            # Interface (React + Tailwind)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── public/
│
├── installer/           # Script para empacotar e instalar MinIO
│   ├── install.sh / .bat
│   └── setup-config.json
│
├── database/            # SQLite local para usuários/config
│   └── mini-cloud.db
│
├── electron/            # Empacotamento desktop
│   ├── main.js
│   └── preload.js
│
└── package.json
````
