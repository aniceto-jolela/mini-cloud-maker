const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let pythonServer;

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const frontendURL =
    process.env.VITE_DEV_SERVER_URL || `file://${path.join(__dirname, "../frontend/dist/index.html")}`;
  win.loadURL(frontendURL);
}

function startPythonBackend() {
  const backendPath = path.join(__dirname, "../backend/app.py");
  pythonServer = spawn("python", [backendPath], {
    stdio: "inherit",
    shell: true,
  });

  pythonServer.on("close", (code) => {
    console.log(`Backend finalizado com código ${code}`);
  });
}

app.whenReady().then(() => {
  createWindow();
  startPythonBackend();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (pythonServer) pythonServer.kill();
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("dialog:chooseFolder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});
