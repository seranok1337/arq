export default function SongCard({
  title = "Unknown Title",
  artist = "Unknown Artist",
  image,
}) {
  return (
    <div
      className="backdrop-blur-sm bg-zinc-900/20 rounded-xl p-2 cursor-pointer transition-all  hover:bg-white/10 group flex gap-2"
    >
      <div className="relative overflow-hidden rounded-md flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-12 h-12 object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-xs font-semibold text-white truncate group-hover:text-white/90 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-xs text-white/70 truncate group-hover:text-white/60 transition-colors duration-200">
          {artist}
        </p>
      </div>
    </div>
  );
}
