import { useState } from "react";
import Button from "../ui/Button";
import { useApp } from "../../hooks/useApp";
import { toast } from "sonner";
import { useAppStore } from "../../stores/useAppStore";

export default function DownloaderPage() {
  const [URL, setURL] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { saveAudioFromURL } = useApp();
  const { path } = useAppStore();
  const { getSongList } = useApp();

  async function handleSave() {
    try {
      setDisabled(true);
      const req = await saveAudioFromURL(path, URL);
      setDisabled(false)

      toast(`${req.title}: ${req.message}`);

      await getSongList();
      return;
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div className="w-full text-white h-full text-center flex justify-center items-center">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl">Download song from URL</h1>
        <p className="text-xs text-white/60">
          Currently, only YouTube links are supported.
        </p>
        <input
          onChange={(e) => setURL(e.target.value)}
          type="text"
          value={URL}
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          className="outline-none border border-black/40 p-2 rounded-xl"
        />
        <Button disabled={disabled} onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}
