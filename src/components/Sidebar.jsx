import useMusicPlayer from "../hooks/useMusicPlayer";
import SongCard from "./SongCard";
import getReadyPicture from "../lib/image";
import { RefreshCcw } from "lucide-react";
import { useRef, useState } from "react";

export default function Sidebar({ data, getData }) {
  const { setCurrentSong } = useMusicPlayer();
  const [input, setInput] = useState("");
  const timerRef = useRef(null);

  const handleSearch = (value) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setInput(value);
    }, 100);
  };

  const filtered = data.filter(
    (i) =>
      i?.title?.toLowerCase().includes(input.toLowerCase()) ||
      i?.artist?.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="h-full space-y-1 text-white w-100  flex flex-col p-3 overflow-y-auto ">
      <div className="sticky z-50 border-t border-zinc-800/10 top-0 w-full bg-zinc-950/10 items-center backdrop-blur-xl rounded-xl p-1 px-2 space-x-2 flex  justify-between">
        <button
          onClick={getData}
          className="bg-white/10 p-1 px-2 rounded-full hover:bg-white/20 duration-100 transition-all cursor-pointer"
        >
          <RefreshCcw width={14} />
        </button>

        <input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          className="outline-none p-2 w-full"
          placeholder="Search Songs..."
        />
      </div>
      {data.length > 0 ? (
        filtered.map((i, index) => (
          <div
            onClick={() => {
              setCurrentSong({
                title: i.title || "?",
                artist: i.artist || "Unknown artist",
                picture: i.picture,
                ...i,
              });
            }}
            key={index}
          >
            <SongCard
              title={i.title}
              artist={i.artist}
              image={getReadyPicture(i.picture)}
            />
          </div>
        ))
      ) : (
        <div className="text-center flex w-full h-full flex-col mt-5 p-2">
          <h1 className="text-2xl">No music found</h1>
          <p className="text-white/60">
            No music was found in the current music folder. Please, put music
            into your OS's Music folder.
          </p>
          <button
            onClick={getData}
            className="mt-5 p-2 bg-zinc-950/50 px-3 rounded-xl hover:bg-white/10 duration-100 transition-all cursor-pointer"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}
