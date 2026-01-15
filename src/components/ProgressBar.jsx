import { useState, useEffect } from "react";
import "./../index.css";
import { useMainContext } from "../context/MainContext";
import { progressButtonTransitionMaterial } from "../utils/helper";
import { useUpgradeContext } from "../context/UpgradeContext";

function ProgressBar({ type, clicksToObtain, payload, resource }) {
  const [progress, setProgress] = useState(0);

  const { state: stateMain, dispatch: dispatchMain } = useMainContext();
  const { state: stateUpgrade } = useUpgradeContext();

  useEffect(() => {
    if (progress >= 100) {
      console.log(type, payload);
      setTimeout(() => {
        dispatchMain({
          type: type,
          payload: { resource: resource, amount: payload },
        });
        setProgress(0);
      }, 100);
    }
  }, [dispatchMain, progress, type, payload, resource]);

  return (
    <div className="border-2 border-gray-200 w-48 flex rounded-xl bg-[#303030] hover:bg-[#4d4d4d]">
      <div
        className={`${progress === 100 ? "transitioned" : "default"}`}
        style={{
          width: `${progress}%`,
          height: "100%",
          //backgroundColor: "rgb(229 231 235)",
          transition: "all 0.01s",
          zIndex: 999,
          borderRadius: "12px",
        }}
      >
        <button
          className="text-gray-200 w-48"
          disabled={progress >= 100}
          onClick={() => {
            if (progress <= 100)
              setProgress((prev) => prev + 100 / clicksToObtain);
          }}
        >
          {progressButtonTransitionMaterial(progress)}
        </button>
      </div>
    </div>
  );
}

export default ProgressBar;
