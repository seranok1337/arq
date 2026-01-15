import { useApp } from "../../hooks/useApp";
import { useAppStore } from "../../stores/useAppStore";
import Sidebar from "../Sidebar";

export default function MainPage() {
  const { songList } = useAppStore();
  const { getSongList } = useApp();

  return (
    <>
      <Sidebar data={songList} getData={getSongList} />
    </>
  );
}
