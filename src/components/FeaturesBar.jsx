import { useMainContext } from "../context/MainContext";

function FeaturesBar() {
  const { state: stateMain } = useMainContext();

  return <div className="flex gap-6"></div>;
}

export default FeaturesBar;
