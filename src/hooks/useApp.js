import useMusicData from "./useMusicData";
import useMusicPlayer from "./useMusicPlayer";
import { useAppStore } from "../stores/useAppStore";
import { toast } from "sonner";

function useApp() {
  const { readDirectory } = useMusicData();
  const { setCurrentSong } = useMusicPlayer();
  const { path, setPath, setSongList, setConfig } = useAppStore();

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
      toast("Fetching music...");
      const data = await readDirectory(path);
      console.log(data);
      setSongList(data);
      setCurrentSong(data[0]);
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

  return { readConfig, configInit, getSongList };
}

export { useApp };
