import { useEffect } from "react";
import MainApplication from "./MainApplication";
import { useAppStore } from "./stores/useAppStore";
import { useApp } from "./hooks/useApp";
import { toast } from "sonner";

function App() {
  const { path } = useAppStore();
  const { configInit, getSongList } = useApp();

  useEffect(() => {
    try {
      configInit();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }, []);

  useEffect(() => {
    if (path) {
      try {
        getSongList();
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
  }, [path]);

  return <MainApplication />;
}

export default App;
