import { create } from "zustand";
import getReadyPicture from "../lib/image";

const useCurrentSongStore = create((set) => ({
  path: "",
  artist: null,
  artists: [],
  title: null,
  track: { no: null, of: null },
  disk: { no: null, of: null },
  picture: [],
  isPlaying: false,
  comment: [],
  encodersettings: null,
  movementIndex: { no: null, of: null },

  setSong: (songData) =>
    set((state) => {
      // revoke previous imag
      if (state.readyPicture?.startsWith("blob:")) {
        URL.revokeObjectURL(state.readyPicture);
      }
      const ready = getReadyPicture(songData.picture);
      return {
        picture: songData.picture,
        readyPicture: ready,
        ...songData,
      };
    }),
  setArtist: (artist) => set({ artist }),
  setTitle: (title) => set({ title }),
  setTrack: (track) => set({ track }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  clearSong: () =>
    set({
      path: "",
      artist: null,
      artists: [],
      title: null,
      track: { no: null, of: null },
      disk: { no: null, of: null },
      picture: [],
      comment: [],
      encodersettings: null,
      movementIndex: { no: null, of: null },
    }),
}));

export { useCurrentSongStore };
