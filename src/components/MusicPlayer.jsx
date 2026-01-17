import { useEffect, useRef, useState } from "react";
import { useCurrentSongStore } from "../stores/useCurrentSongStore";
import { Hourglass, PauseIcon, Play, Volume2, VolumeOff } from "lucide-react";
import getReadyPicture from "../lib/image";
import { audioManager } from "../lib/audioManager";
import RangeComponent from "./ui/RangeComponent";
import IconTooltip from "./ui/IconTooltip";

export default function MusicPlayer() {
  const { title, artist, path, picture, isPlaying, setIsPlaying } =
    useCurrentSongStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [audioVolume, setAudioVolume] = useState(0.5);
  const [audioPitch, setAudioPitch] = useState(1);
  const songRef = useRef(null);
  const audio = songRef.current;

  const play = async () => {
    if (!audio && path) {
      const loadedAudio = await audioManager.loadAudio(path);
      songRef.current = loadedAudio;
      loadedAudio.volume = audioVolume;
      loadedAudio.playbackRate = audioPitch;
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
    if (audio) {
      audio.pause();
      setIsPlaying(false);
      songRef.current = null;
    }
  }, [title]);

  useEffect(() => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [path]);

  useEffect(() => {
    if (!audio) return;

    const handleTimeUpdate = () => {
      const time = Math.round(audio.currentTime);
      const duration = Math.round(audio.duration);

      if (time === duration) {
        setCurrentTime(0);
        setIsPlaying(false);
      }
      setCurrentTime(time);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [songRef.current]);

  const handleVolumeChange = (value) => {
    setAudioVolume(value);
    if (audio) {
      audio.volume = value;
    }
  };

  const handleDurationChange = (value) => {
    setCurrentTime(value);
    if (audio) {
      audio.currentTime = value;
    }
  };

  const handlePitchChange = (value) => {
    setAudioPitch(value);
    if (audio) {
      audio.playbackRate = value;
    }
  };

  return (
    <div className="rounded-3xl bg-zinc-900/10 backdrop-blur-3xl border-t border-zinc-800/10 px-4 py-3">
      <div className="flex items-center gap-4 max-w-6xl mx-auto ">
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

        <div className="transition-all duration-100">
          <RangeComponent
            value={currentTime}
            max={Math.round(songRef.current?.duration) || 1}
            onChange={(value) => handleDurationChange(value)}
          />
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={play}
            className="text-white active:scale-95 transition-all duration-50"
          >
            {isPlaying ? <PauseIcon /> : <Play />}
          </button>
          <IconTooltip
            onClick={() =>
              audioVolume === 0
                ? handleVolumeChange(0.5)
                : handleVolumeChange(0)
            }
            icon={audioVolume === 0 ? VolumeOff : Volume2}
          >
            <RangeComponent
              max={1}
              value={audioVolume}
              onChange={(value) => {
                if (value <= 0.01) {
                  handleVolumeChange(0);
                } else {
                  handleVolumeChange(value);
                }
              }}
            />
          </IconTooltip>
          <IconTooltip onClick={() => handlePitchChange(1)} icon={Hourglass}>
            <RangeComponent
              max={2}
              step={0.1}
              value={audioPitch}
              onChange={(value) => handlePitchChange(value)}
            />
          </IconTooltip>
        </div>
      </div>
    </div>
  );
}
