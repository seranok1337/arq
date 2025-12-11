import { useCurrentSongStore } from "../stores/useCurrentSongStore";

export default function useMusicPlayer() {
  const { setSong } = useCurrentSongStore();

  const setCurrentSong = (song) => {
    try {
      setSong(song);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { setCurrentSong };
}
