export default function useMusicData() {
  const AUDIO_TYPES = new Set(["mp3", "flac", "wav", "m4a"]);

  const readSongData = async (path) => {
    try {
      const data = await window.api.parseMusicMetadata(path);
      return { ...data, path };
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const readDirectory = async (path) => {
    try {
      const dir = await window.api.readDirectory(path);

      const audio = dir.filter((file) => {
        const ext = file.split(".").pop().toLowerCase();
        return AUDIO_TYPES.has(ext);
      });

      const metadata = await Promise.all(
        audio.map((file) => readSongData(path + "/" + file))
      );

      return metadata
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { readSongData, readDirectory };
}
