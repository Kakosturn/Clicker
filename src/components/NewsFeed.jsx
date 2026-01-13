import { useEffect, useState } from "react";
import { useMainContext } from "../context/MainContext";
import { between, selectNewsFeed } from "../utils/helper";
import TextTransition, { presets } from "react-text-transition";

const mainNews = {
  "beginning/0":
    "You opened your eyes in an unknown forest. You are not even sure if it is Earth. Need for a roof over your head, you begin the instruction of your first building.",
  "firstCabin/1":
    "No matter how much you build, weird creatures appear and settle in your buildings.",
  "firstBungalow/1":
    "Once you built a shack, a creature called Venatrix suddenly appeared inside the shack. It seems friendly for now.",
};

function NewsFeed() {
  const { state } = useMainContext();
  const newsFeed = selectNewsFeed(mainNews, state.status);
  //console.log(state.randomTexts);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex(between(0, state.randomTexts.length)),
      20000
    );
    return () => clearTimeout(intervalId);
  }, [state.randomTexts.length]);

  return (
    <div className="text-center border-2 border-gray-200 w-1/2 h-auto ml-auto mr-auto py-5 px-10 rounded-2xl grid grid-cols-1 justify-center items-center ">
      <p>
        <TextTransition springConfig={presets.gentle}>
          {newsFeed}
        </TextTransition>
      </p>
      <p className="grow-0 shrink">
        <TextTransition inline springConfig={presets.gentle}>
          {state.randomTexts[index % state.randomTexts.length]}
        </TextTransition>
      </p>
    </div>
  );
}

export default NewsFeed;
