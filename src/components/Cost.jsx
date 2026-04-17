import Icon from "./Icon";

function Cost({ cost, iconType }) {
  const materials = Object.keys(cost).filter((el) => el !== "_fields");
  // console.log(materials);
  return (
    <div className="flex flex-wrap gap-2">
      {materials.map((el, i) => {
        if (cost[el] === 0) return null;

        return (
          <div
            key={i}
            className="flex items-center gap-1.5   px-2 py-0.5 rounded-xs shadow-inner"
          >
            <span className="font-bold font-mono text-lg text-gray-200">
              {cost[el]}
            </span>
            {/* Reduced icon width slightly so it fits the badge nicely */}
            <Icon type={iconType} path={`${el}.png`} width="w-4" />
          </div>
        );
      })}
    </div>
  );
}

export default Cost;

/// old return

// return (
//     <div className="flex gap-3">
//       {materials.map((el, i) => {
//         return (
//           <>
//             {cost[el] === 0 ? null : (
//               <span className="flex gap-1 items-center" key={i}>
//                 <span>{cost[el]}</span>
//                 <Icon type={iconType} path={`${el}.png`} />
//               </span>
//             )}
//           </>
//         );
//       })}
//     </div>
//   );
