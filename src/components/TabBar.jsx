export default function TabBar({ tabs, setCurrentTab }) {
  return (
    <div className="flex flex-col text-white justify-center items-center space-y-5 w-10 mr-2 h-full">
      {tabs.map((tab, index) => (
        <div
          className="w-8 h-8 flex cursor-pointer justify-center items-center bg-zinc-900/40 rounded-xl"
          key={index}
          onClick={() => setCurrentTab(index)}
        >
          <div>{tab.icon}</div>
        </div>
      ))}
    </div>
  );
}
