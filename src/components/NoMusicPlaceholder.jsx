import Button from "./ui/Button";

export default function NoMusicPlaceholder({ getData }) {
  return (
    <div className="text-center flex w-full h-full flex-col mt-5 p-2">
      <h1 className="text-2xl">No music found</h1>
      <p className="text-white/60">
        No music was found in the current music folder. Please, put music into
        the folder you have set in the settings page.
      </p>
      <Button onClick={getData}>Refresh</Button>
    </div>
  );
}
