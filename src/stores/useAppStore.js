import { create } from "zustand";

const useAppStore = create((set) => ({
  path: "",
  setPath: (newPath) =>
    set({
      path: newPath,
    }),
  songList: [],
  setSongList: (newSongList) => set({ songList: newSongList }),
  config: {},
  setConfig: (config) => set({ config }),
}));

export { useAppStore };
