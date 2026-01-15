import useMusicPlayer from "../hooks/useMusicPlayer";
import SongCard from "./SongCard";
import getReadyPicture from "../lib/image";
import { RefreshCcw, X } from "lucide-react";
import { useRef, useState } from "react";
import NoMusicPlaceholder from "./NoMusicPlaceholder";

export default function Sidebar({ data, getData }) {
  const { setCurrentSong } = useMusicPlayer();
  const [input, setInput] = useState("");
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  const handleSearch = (value) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setInput(value);
    }, 100);
  };

  const handleClear = () => {
    handleSearch("")
    inputRef.current.value = ""
  }

  const filtered = data.filter(
    (i) =>
      i?.title?.toLowerCase().includes(input.toLowerCase()) ||
      i?.artist?.toLowerCase().includes(input.toLowerCase())
  );

  const setSong = (i) => {
    setCurrentSong({
      title: i.title || "?",
      artist: i.artist || "Unknown artist",
      picture: i.picture,
      ...i,
    });
  };

  return (
    <div className="h-full mb-25 space-y-1 text-white w-100  flex flex-col p-3 overflow-y-auto ">
      <div className="sticky z-50 border-t border-zinc-800/10 top-0 w-full bg-zinc-950/10 items-center backdrop-blur-xl rounded-xl p-1 px-2 space-x-2 flex  justify-between">
        <button
          onClick={getData}
          className="bg-white/10 p-1 px-2 rounded-full hover:bg-white/20 duration-100 transition-all cursor-pointer"
        >
          <RefreshCcw width={14} />
        </button>

        <input
          ref={inputRef}
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          className="outline-none p-2 w-full"
          placeholder="Search Songs..."
        />

        <X onClick={() => handleClear()} />
      </div>
      <div className="space-y-1 mb-20">
        {data.length > 0 ? (
          filtered.map((i, index) => (
            <div onClick={() => setSong(i)} key={index}>
              <SongCard
                title={i.title}
                artist={i.artist}
                image={getReadyPicture(i.picture)}
              />
            </div>
          ))
        ) : (
          <NoMusicPlaceholder getData={getData} />
        )}
      </div>
    </div>
  );
}
