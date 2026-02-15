import { toast } from "react-hot-toast";

export function errorToast(message) {
  toast.custom((t) => (
    <div
      className={`
        ${t.visible ? "animate-enter" : "animate-leave"}
        bg-red-400 text-white px-4 py-3 rounded-lg shadow-lg
        flex items-center gap-3
      `}
    >
      <span className="font-semibold">Error</span>
      <span>{message}</span>

      <button
        onClick={() => toast.dismiss(t.id)}
        className="ml-auto text-sm opacity-80 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  ));
}

export function notifToast(message) {
  toast.custom((t) => (
    <div
      className={`
        ${t.visible ? "animate-enter" : "animate-leave"}
        bg-zinc-800 text-zinc-300 text-2xl px-4 py-3 rounded-lg shadow-lg
        flex items-center gap-3
      `}
    >
      <span>{message}</span>

      <button
        onClick={() => toast.dismiss(t.id)}
        className="ml-auto text-sm opacity-80 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  ));
}
