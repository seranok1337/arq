export default function Button({ children, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="p-2 bg-zinc-950/50 disabled:bg-zinc-950/30 disabled:cursor-not-allowed px-3 rounded-xl hover:bg-white/10 duration-100 transition-all cursor-pointer"
    >
      {children}
    </button>
  );
}
