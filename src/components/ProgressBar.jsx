import { useEffect, useState } from "react";
import { useMainStore } from "../stores/useMainStore.js";

function ProgressBar({ type, clicksToObtain, payload, resource }) {
  const [progress, setProgress] = useState(0);

  const dynamicAction = useMainStore((state) => state[type]);
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        dynamicAction({ resource: resource, amount: payload });
        setProgress(0);
      }, 100);
    }
  }, [progress, type, payload, resource, dynamicAction]);

  return (
    <div
      className="
        relative w-3/4 h-10
        rounded-xl
        overflow-hidden
        bg-zinc-800
        border border-zinc-700
        shadow-inner
        hover:bg-zinc-600
      "
    >
      {/* Fill */}
      <div
        className="
          absolute left-0 top-0 h-full
          bg-linear-to-r
          from-emerald-500 via-green-400 to-lime-300
          shadow-[0_0_12px_rgba(120,255,120,0.6)]
          transition-[width] duration-200 ease-out
        "
        style={{ width: `${progress}%` }}
      />

      {/* Shine */}
      {progress > 0 && progress < 100 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="shine" />
        </div>
      )}

      {/* Button */}
      <button
        className="
          relative z-10 w-full h-full
          font-semibold tracking-wide
          text-zinc-100
          disabled:text-zinc-400
        "
        disabled={progress >= 100}
        onClick={() => {
          if (progress < 100) {
            setProgress((prev) => prev + 100 / clicksToObtain);
          }
        }}
      >
        {progress >= 100 ? "Success" : "Collect"}
      </button>
    </div>
  );
}

export default ProgressBar;
