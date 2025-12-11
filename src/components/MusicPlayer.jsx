import { useEffect, useRef, useState } from "react";
import { useCurrentSongStore } from "../stores/useCurrentSongStore";
import { PauseIcon, Play } from "lucide-react";
import getReadyPicture from "../lib/image";
import { toast } from "sonner";
import { audioManager } from "../lib/audioManager";

export default function MusicPlayer() {
  const { title, artist, path, picture, isPlaying, setIsPlaying } =
    useCurrentSongStore();
  const [currentTime, setCurrentTime] = useState(0);
  const songRef = useRef(null);

  const play = async () => {
    if (!songRef.current && path) {
      const audio = await audioManager.loadAudio(path);
      songRef.current = audio;
      audioManager.play();
      setIsPlaying(true);
    }

    if (isPlaying) {
      audioManager.pause();
      setIsPlaying(false);
    } else {
      audioManager.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (songRef.current) {
      songRef.current.pause();
      setIsPlaying(false);
      songRef.current = null;
    }
  }, [title]);

  useEffect(() => {
    if (songRef.current) {
      songRef.current.pause();
      setIsPlaying(false);
    }
  }, [path]);

  useEffect(() => {
    const audio = songRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const time = Math.round(audio.currentTime);
      const duration = Math.round(audio.duration);

      if (time === duration) {
        setCurrentTime(0);
        setIsPlaying(false);
      }

      setCurrentTime(secondsToPercentage(time, audio.duration));
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [songRef.current]);

  const secondsToPercentage = (current, total) => {
    return (current / total) * 100;
  };

  return (
    <div className="rounded-3xl bg-zinc-900/10 backdrop-blur-3xl border-t border-zinc-800/10 px-4 py-3">
      <div className="flex items-center gap-4 max-w-6xl mx-auto">
        <div className="w-14 h-14 bg-zinc-800 flex-shrink-0 rounded-2xl">
          <img
            className="w-full h-full object-cover rounded-2xl"
            src={getReadyPicture(picture)}
            alt={title}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-medium truncate">{title}</h3>
          <p className="text-zinc-400 text-xs truncate">{artist}</p>
        </div>

        <div className="transition-all duration-100 w-50">
          <div className="h-1 bg-zinc-700 rounded-full">
            <div
              style={{
                width: `${currentTime}%`,
              }}
              className="h-1 bg-white transition-all duration-100 rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button onClick={play} className="text-white active:scale-95 transition-all duration-50">
            {isPlaying ? <PauseIcon /> : <Play />}
          </button>
        </div>
      </div>
    </div>
  );
}
