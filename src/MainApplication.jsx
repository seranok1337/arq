import getReadyPicture from "./lib/image";
import { useState } from "react";
import MainPage from "./components/pages/MainPage";
import SettingsPage from "./components/pages/SettingsPage";
import TabBar from "./components/TabBar";
import { HomeIcon, Settings } from "lucide-react";
import MusicPlayer from "./components/MusicPlayer";
import { useCurrentSongStore } from "./stores/useCurrentSongStore";
import SlideUp from "./components/animations/SlideUp";

export default function MainApplication() {
  const [currentTabId, setCurrentTabId] = useState(0);
  const { picture } = useCurrentSongStore();

  const tabs = [
    {
      title: "Home",
      icon: <HomeIcon width={18} height={18} />,
      page: <MainPage />,
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
        <SlideUp motionKey={currentTabId}>{tabs[currentTabId].page}</SlideUp>
        <div className="absolute right-2 bottom-2 left-2">
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
}
