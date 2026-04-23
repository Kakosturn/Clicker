import { useEffect } from "react";
import "./index.css";

import Initial from "./Pages/Initial";
import Layout from "./components/Layout/Layout";
import Beginning from "./Pages/Beginning";
import { beginningCheck } from "./utils/helper";
import { Toaster } from "react-hot-toast";
import { useMainStore } from "./stores/useMainStore";
function App() {
  const reset = useMainStore((state) => state.reset);
  const status = useMainStore((state) => state.status);

  //console.log(state.venatrix, state.status);
  useEffect(
    function () {
      reset();
    },
    [reset],
  );

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
