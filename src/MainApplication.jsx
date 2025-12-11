import getReadyPicture from "./lib/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import MainPage from "./components/pages/MainPage";
import SettingsPage from "./components/pages/SettingsPage";
import TabBar from "./components/TabBar";
import { useAppStore } from "./stores/useAppStore";
import { useApp } from "./hooks/useApp";
import { HomeIcon, Settings } from "lucide-react";
import MusicPlayer from "./components/MusicPlayer";
import { useCurrentSongStore } from "./stores/useCurrentSongStore";

export default function MainApplication() {
  const [currentTabId, setCurrentTabId] = useState(0);
  const { songList } = useAppStore();
  const { getSongList } = useApp();
  const { picture } = useCurrentSongStore();

  const tabs = [
    {
      title: "Home",
      icon: <HomeIcon width={18} height={18} />,
      page: <MainPage data={songList} getData={getSongList} />,
    },
    {
      title: "Settings",
      icon: <Settings width={18} height={18} />,
      page: <SettingsPage />,
    },
  ];

  return (
    <div className="w-full h-screen flex justify-between bg-zinc-800 p-2">
      <TabBar setCurrentTab={setCurrentTabId} tabs={tabs} />

      <div className="bg-zinc-900 w-full relative h-full flex rounded-3xl">
        <div className="absolute w-full h-full object-cover">
          <img
            src={getReadyPicture(picture)}
            alt="This picture failed to load."
            className="blur-3xl opacity-50 w-full h-full object-cover select-none"
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="absolute w-full h-full inset-0 "
            key={currentTabId}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.1 }}
          >
            {tabs[currentTabId].page}
          </motion.div>
        </AnimatePresence>
        <div className="absolute right-2 bottom-2 left-2">
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
}
