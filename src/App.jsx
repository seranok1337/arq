import { useEffect } from "react";
import MainApplication from "./MainApplication";
import { useAppStore } from "./stores/useAppStore";
import { useApp } from "./hooks/useApp";

function App() {
  const { path } = useAppStore();
  const { configInit, getSongList } = useApp();

  useEffect(() => {
    configInit();
  }, []);

  useEffect(() => {
    if (path) getSongList();
  }, [path]);

  return <MainApplication />;
}

export default App;
