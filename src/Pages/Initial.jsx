import Button from "../components/Button";
import { useMainContext } from "../context/MainContext";

function Initial() {
  const { dispatch } = useMainContext();

  return (
    <div className="bg-[#202020] flex flex-col items-center pt-16 gap-24">
      <p className="text-5xl">Are you ready to begin ?</p>
      <Button
        onClick={() => dispatch({ type: "beginning/0" })}
        className={"text-3xl"}
      >{`Begin`}</Button>
    </div>
  );
}

export default Initial;
