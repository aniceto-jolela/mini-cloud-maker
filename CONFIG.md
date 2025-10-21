[![visual studio code](https://img.shields.io/badge/ide-visual_studio_code_1.103.2-purple)](https://code.visualstudio.com/download)
[![nodejs](https://img.shields.io/badge/nodejs-24.7.0-blue)](https://nodejs.org/en/download/current)
[![npm](https://img.shields.io/badge/npm-11.5.1-blue)](https://nodejs.org/en/download/current)
[![flask](https://img.shields.io/badge/flask-blue)](https://flask.palletsprojects.com/en/stable/installation/)



###  Configuração do Backend (Flask)

##### Virtual environments
```bash
 > mkdir myproject
 > cd myproject
 > py -3 -m venv .venv
```

##### Activate the environment
```bash
 .venv\Scripts\activate
```
##### Install Flask
```bash
pip install Flask
```

##### Install dependencies on the backend:
```bash
pip install flask flask-cors minio psutil
```

##### Rotate the minio in the terminal:
````bash
backend\storage\minio.exe server backend\data --console-address :9001
```

##### Start backend:
```bash
python backend/server.py
```

### Configure the frontend (React + Vite):

```bash
cd frontend
npm create vite@latest frontend -- --template react
npm run dev
```
- npm run dev
http://localhost:5173

##### Install Recharts (graphics):
```bash
npm install recharts
```

**CORS (Cross-Origin Resource Sharing):** Por padrão, o navegador bloqueia requisições entre portas diferentes (3000 do backend e 5173 do frontend). É necessario configurar o Flask para permitir essas requisições


Acessar MinIO console (UI):
👉 http://localhost:9001

login: minioadmin
senha: minioadmin


### Install Electron inside the project (root):
```bash
cd MiniCloudMaker
npm init -y
npm install electron concurrently cross-env
```

#### Generating the Frontend Build
```bash
cd frontend
npm run build
```
***This generates the /dist folder, which Electron will open.***

#### Rotating the Desktop App
```bash
cd electron
npm run start
```

