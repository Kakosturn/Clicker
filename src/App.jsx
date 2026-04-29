import { useEffect, useRef } from "react";
import "./index.css";

import Initial from "./Pages/Initial";
import Layout from "./components/Layout/Layout";
import Beginning from "./Pages/Beginning";
import { beginningCheck } from "./utils/helper";
import { Toaster } from "react-hot-toast";
import { useMainStore } from "./stores/useMainStore";
import { useUpgradeStore } from "./stores/useUpgradeStore";
import { loadGame, saveGame } from "./utils/saveSystem";
function App() {
  const reset = useMainStore((state) => state.reset);
  const status = useMainStore((state) => state.status);
  const upgradeEvaluation = useUpgradeStore((state) => state.upgradeEvaluation);
  const hasLoaded = useRef(false);
  //console.log(state.venatrix, state.status);

  // 1. The Global Game Loop
  useEffect(() => {
    // A. Load once on boot

    if (!hasLoaded.current) {
      loadGame();
      upgradeEvaluation();
      hasLoaded.current = true;
    }

    // B. The 1-second math checker
    const upgradeInterval = setInterval(() => {
      upgradeEvaluation();
    }, 1000);

    // C. The 60-second auto-save
    const autoSaveInterval = setInterval(() => {
      saveGame();
    }, 60000);

    // Cleanup just in case
    return () => {
      clearInterval(upgradeInterval);
      clearInterval(autoSaveInterval);
    };
  }, [upgradeEvaluation]);

  const bool = beginningCheck(status);
  //console.log(bool);
  return (
    <Layout>
      {status === "ready" && <Initial />}
      {bool && <Beginning />}
      <Toaster position="top-right" />
    </Layout>
  );
}

export default App;
