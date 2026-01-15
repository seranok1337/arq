export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-5 p-2 bg-zinc-950/50 px-3 rounded-xl hover:bg-white/10 duration-100 transition-all cursor-pointer"
    >
      {children}
    </button>
  );
}
