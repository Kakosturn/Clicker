import { useEffect } from "react";
import "./index.css";
import { useMainContext } from "./context/MainContext";
import Initial from "./Pages/Initial";
import Layout from "./components/Layout/Layout";
import Beginning from "./Pages/Beginning";
import { beginningCheck } from "./utils/helper";
import { Toaster } from "react-hot-toast";
function App() {
  const { state, dispatch } = useMainContext();
  console.log(state.status);
  //console.log(state.venatrix, state.status);
  useEffect(
    function () {
      dispatch({ type: "reset" });
    },
    [dispatch]
  );
  const bool = beginningCheck(state.status);
  //console.log(bool);
  return (
    <Layout>
      {state.status === "ready" && <Initial />}
      {bool && <Beginning />}
      <Toaster />
    </Layout>
  );
}

export default App;
