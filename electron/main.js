import fs from "fs/promises";
import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { ipcMain } from "electron";
import isDev from "electron-is-dev";
import { parseFile } from "music-metadata";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

const musicPath = app.getPath("music");
const configPath = path.join(app.getPath("userData"), "/config.json");

function checkIfPathDestinationExists(path) {
  return fs
    .access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

async function createConfigFile() {
  try {
    // config with default os music folder path
    const config = JSON.stringify({
      path: musicPath,
    });

    if (!(await checkIfPathDestinationExists(configPath))) {
      await fs.writeFile(configPath, config, "utf-8");
    }
  } catch (error) {
    console.error;
    throw error;
  }
}

function createWindow() {
  app.setName("Arq");

  createConfigFile();

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    contextIsolation: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  const startUrl = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../dist/index.html")}`;

  mainWindow.loadURL(startUrl);
}

ipcMain.handle("read-file", async (_, filePath) => {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (err) {
    throw err;
  }
});

ipcMain.handle("read-config", async () => {
  try {
    const configFile = await fs.readFile(configPath, "utf-8");
    const parsedConfig = JSON.parse(configFile);

    return parsedConfig;
  } catch (err) {
    throw err;
  }
});

ipcMain.handle("does-dir-exist", async (_, path) => {
  try {
    const res = await checkIfPathDestinationExists(path);
    return res;
  } catch (err) {
    throw err;
  }
});

ipcMain.handle("write-file", async (_, filePath, content) => {
  try {
    await fs.writeFile(filePath, content, "utf-8");
    return { success: true };
  } catch (err) {
    throw err;
  }
});

ipcMain.handle("load-audio", async (_, filePath) => {
  try {
    console.log(filePath);
    const data = await fs.readFile(filePath);
    return Array.from(new Uint8Array(data));
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
});

ipcMain.handle("parse-music-metadata", async (_, filePath) => {
  try {
    const { common } = await parseFile(filePath);
    return common;
  } catch (err) {
    throw err;
  }
});

ipcMain.handle("read-directory", async (_, dirPath) => {
  try {
    const dir = await fs.readdir(dirPath);

    return dir;
  } catch (err) {
    throw err;
  }
});

ipcMain.handle("write-config", async (_, content) => {
  try {
    const str = JSON.stringify(content);
    await fs.writeFile(configPath, str, "utf-8");
    return { success: true };
  } catch (err) {
    throw err;
  }
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
