const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let pythonProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.join(__dirname, "../frontend/dist/index.html"));

  win.on("closed", () => {
    if (pythonProcess) pythonProcess.kill();
  });
}

app.whenReady().then(() => {
  // Inicia o backend Python
  const script = path.join(__dirname, "../backend/server.py");
  pythonProcess = spawn("python", [script]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Backend: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Erro: ${data}`);
  });

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
