import Icon from "./Icon";

function Cost({ cost, iconType }) {
  const materials = Object.keys(cost).filter((el) => el !== "_fields");
  // console.log(materials);
  return (
    <div className="flex gap-3">
      {materials.map((el, i) => {
        return (
          <>
            {cost[el] === 0 ? null : (
              <span className="flex gap-1" key={i}>
                <span>{cost[el]}</span>
                <Icon type={iconType} path={`${el}.png`} />
              </span>
            )}
          </>
        );
      })}
    </div>
  );
}

export default Cost;
