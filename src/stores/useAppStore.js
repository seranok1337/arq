import { create } from "zustand";

const useAppStore = create((set) => ({
  path: "",
  setPath: (path) =>
    set({
      path,
    }),
  songList: [],
  setSongList: (songList) => set({ songList }),
  config: {},
  setConfig: (config) => set({ config }),
  isDownloading: false,
  setIsDownloading: (isDownloading) => set({ isDownloading }),
}));

export { useAppStore };
