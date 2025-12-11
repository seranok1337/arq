const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  readFile: (filePath) => ipcRenderer.invoke("read-file", filePath),
  readDirectory: (dirPath) => ipcRenderer.invoke("read-directory", dirPath),
  writeFile: (filePath, content) =>
    ipcRenderer.invoke("write-file", filePath, content),
  parseMusicMetadata: (filePath) =>
    ipcRenderer.invoke("parse-music-metadata", filePath),
  loadAudio: (path) => ipcRenderer.invoke("load-audio", path),
  readConfig: () => ipcRenderer.invoke("read-config"),
});
