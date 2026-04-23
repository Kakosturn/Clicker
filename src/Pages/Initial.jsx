import Button from "../components/Button";

import { useMainStore } from "../stores/useMainStore";

function Initial() {
  const beginningStatus = useMainStore((state) => state.beginningStatus);

  return (
    <div className="bg-[#202020] flex flex-col items-center pt-16 gap-24">
      <p className="text-5xl">Are you ready to begin ?</p>
      <Button
        onClick={() => beginningStatus()}
        className={"text-3xl"}
      >{`Begin`}</Button>
    </div>
  );
}

export default Initial;
