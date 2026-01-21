import useMusicData from "./useMusicData";
import useMusicPlayer from "./useMusicPlayer";
import { useAppStore } from "../stores/useAppStore";
import { toast } from "sonner";

function useApp() {
  const { readDirectory } = useMusicData();
  const { setCurrentSong } = useMusicPlayer();
  const { path, setPath, setSongList, setConfig } = useAppStore();
  const placeholderSong = {
    title: "None",
    artist: "None",
  };

  const configInit = async () => {
    try {
      const config = await readConfig();
      setConfig(config);
      setPath(config.path);
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const getSongList = async () => {
    try {
      const exists = await window.api.doesDirExist(path);

      if (exists) {
        const data = await readDirectory(path);
        setSongList(data);
        setCurrentSong(data[0] || placeholderSong);
        toast("Loaded folder.");
      } else {
        toast("This directory does not exist!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const readConfig = async () => {
    try {
      const config = await window.api.readConfig();

      return config;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const writeConfig = async (content) => {
    try {
      const config = await window.api.writeConfig(content);

      return config;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const doesDirExist = async (path) => {
    try {
      const res = await window.api.doesDirExist(path);

      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const saveAudioFromURL = async (path, url) => {
    try {
      const res = await window.api.saveAudioFromURL(path, url)

      return res;
    } catch (error) {
      throw error
    }
  };

  return { readConfig, configInit, getSongList, writeConfig, doesDirExist, saveAudioFromURL };
}

export { useApp };
