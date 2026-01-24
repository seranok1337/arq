import fs from "fs/promises";
import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { checkIfPathDestinationExists } from "./helpers.js";
import isDev from "electron-is-dev";
import setupHandlers from "./handlers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

const musicPath = app.getPath("music");
const configPath = path.join(app.getPath("userData"), "/config.json");

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

  setupHandlers(mainWindow, configPath)

  const startUrl = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../dist/index.html")}`;

  mainWindow.loadURL(startUrl);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
