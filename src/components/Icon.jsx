// function Icon({ path, width = "w-1/4" }) {
//   return <img src={`./public/${path}`} alt="" className={`inline w-10`} />;
// }

import { Tooltip } from "react-tooltip";

// export default Icon;

function Icon({ path, width = "w-1/4", type = "resource", tooltip }) {
  if (type === "upgrade") {
    return (
      <div
        data-tooltip-id="tooltip-2"
        data-tooltip-content={tooltip}
        className="
        w-10 h-10
        flex items-center justify-center
        rounded-md
        bg-zinc-800
        shadow-inner
        
      "
      >
        <Tooltip
          id="tooltip-2"
          style={{
            backgroundColor: "#303030",
            color: "rgb(229,231,235)",
            zIndex: "9999",
            transform: "scale(0.6) translateX(-30%)",
          }}
        />
        <img
          src={`./public/${path}`}
          alt=""
          className="
          w-6 h-6
          object-contain
          drop-shadow-[0_0_4px_rgba(255,255,255,0.25)]
        "
        />
      </div>
    );
  }
  if (type === "plain")
    return <img src={`./public/${path}`} alt="" className={`inline w-10`} />;

  return (
    <div
      className="
        w-10 h-10
        flex items-center justify-center
        rounded-md
        bg-zinc-800
        shadow-inner
      "
    >
      <img
        src={`./public/${path}`}
        alt=""
        className="
          w-6 h-6
          object-contain
          drop-shadow-[0_0_4px_rgba(255,255,255,0.25)]
        "
      />
    </div>
  );
}

export default Icon;
