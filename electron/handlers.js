import { ipcMain } from "electron";
import fs from "fs/promises";
import { parseFile } from "music-metadata";
import { checkIfPathDestinationExists } from "./helpers.js";

export default function setupHandlers(mainWindow, configPath) {
  ipcMain.handle("read-file", async (_, filePath) => {
    try {
      return await fs.readFile(filePath, "utf-8");
    } catch (err) {
      throw err;
    }
  });

  ipcMain.handle("save-audio-from-URL", async (_, path, URL) => {
    try {
      const video = await fetch("https://cnvmp3.com/get_video_data.php", {
        method: "POST",
        body: JSON.stringify({ url: URL, token: "1234" }),
      });
      const videoData = await video.json();
      if (!video.ok || videoData.error) {
        return {
          success: false,
          error: videoData.error || "Failed to get video data",
        };
      }

      const download = await fetch(
        "https://cnvmp3.com/download_video_ucep.php",
        {
          method: "POST",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (X11; Linux x86_64; rv:141.0) Gecko/20100101 Firefox/141.0",
            Accept: "*/*",
            "Content-Type": "application/json",
            Referer: "https://cnvmp3.com/v51",
            Origin: "https://cnvmp3.com",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
          },
          body: JSON.stringify({
            url: URL,
            title: videoData.title,
            quality: 4,
            formatValue: 1,
          }),
        },
      );
      const downloadLinkData = await download.json();
      if (!download.ok || downloadLinkData.error) {
        return {
          success: false,
          error: downloadLinkData.error || "Failed to get download link",
        };
      }

      const fileResponse = await fetch(downloadLinkData.download_link, {
        headers: {
          Referer: "https://cnvmp3.com/",
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64; rv:141.0) Gecko/20100101 Firefox/141.0",
        },
      });
      if (!fileResponse.ok) {
        return { success: false, error: "Failed to download file" };
      }

      const buffer = Buffer.from(await fileResponse.arrayBuffer());
      await fs.writeFile(`${path}/${videoData.title}.mp3`, buffer);

      return {
        success: true,
        message: "Saved audio successfully.",
        title: videoData.title || "Unknown Title",
      };
    } catch (err) {
      return { success: false, error: err.message };
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
}
