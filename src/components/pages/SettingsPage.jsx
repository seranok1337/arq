import { useState } from "react";
import { useAppStore } from "../../stores/useAppStore";
import { useApp } from "../../hooks/useApp";
import { toast } from "sonner";
import Button from "../ui/Button";

export default function SettingsPage() {
  const { path, setPath, config, setConfig } = useAppStore();
  const { writeConfig, doesDirExist } = useApp();
  const [musicFolderPath, setMusicFolderPath] = useState(path);

  async function handleSaveConfig() {
    try {
      const newConfig = structuredClone(config);
      const dir = await doesDirExist(musicFolderPath);

      if (dir) {
        newConfig.path = musicFolderPath;
      }

      writeConfig(newConfig);
      setConfig(newConfig);
      setPath(musicFolderPath);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-4 text-white flex flex-col">
      <h1 className="text-5xl">Settings</h1>
      <div className="space-x-5">
        <input
          type="text"
          className="outline-none"
          value={musicFolderPath}
          onChange={(e) => setMusicFolderPath(e.target.value)}
        />
        <Button onClick={handleSaveConfig}>Save</Button>
      </div>
    </div>
  );
}
