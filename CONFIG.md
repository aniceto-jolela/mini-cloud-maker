[![visual studio code](https://img.shields.io/badge/ide-visual_studio_code_1.103.2-purple)](https://code.visualstudio.com/download)
[![nodejs](https://img.shields.io/badge/nodejs-24.7.0-blue)](https://nodejs.org/en/download/current)
[![npm](https://img.shields.io/badge/npm-11.5.1-black)](https://nodejs.org/en/download/current)
[![flask](https://img.shields.io/badge/flask-blue)](https://flask.palletsprojects.com/en/stable/installation/)
[![tailwindcss](https://img.shields.io/badge/tailwindcss-white)](https://tailwindcss.com/docs/installation/using-vite)
[![catalyst](https://img.shields.io/badge/catalyst-cyan)](https://catalyst.tailwindui.com/docs)



###  Configuração do Backend (Flask/FastAPI)

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
pip install -U bcrypt flask flask-cors minio psutil

```
```bash
pip install PyJWT
```

##### Rotate the minio in the terminal!:
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

### Install dependencies
These libs allow running React (Vite) and Electron in parallel.
```bash
npm install electron concurrently wait-on cross-env
```


## 🎨 Paleta de Cores Recomendada - Tema Azul Profissional

#### Cores Principais:
/* Azul Primário - Profissional e Confiável */
primary: {
  50: '#eef2ff',
  100: '#e0e7ff', 
  200: '#c7d2fe',
  300: '#a5b4fc',
  400: '#818cf8',
  500: '#6366f1',  // Cor principal - Índigo
  600: '#4f46e5',
  700: '#4338ca',
  800: '#3730a3',
  900: '#312e81',}

#### Cores de Apoio:

/* Verde para sucesso/backup */
green: {
  500: '#10b981',  // Para backup, sucesso
  600: '#059669',}

/* Laranja para oficina/energia */
orange: {
  500: '#f59e0b',  // Para oficina, ação
  600: '#d97706',}

/* Roxo para criatividade/estúdio */
purple: {
  500: '#8b5cf6',  // Para estúdio, mídia
  600: '#7c3aed',}

/* Azul claro para arquivos/gestão */
blue: {
  500: '#3b82f6',  // Para gestão de arquivos
  600: '#2563eb',}

