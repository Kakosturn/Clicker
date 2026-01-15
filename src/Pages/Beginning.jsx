import Buildings from "../components/Buildings";
import FeaturesBar from "../components/FeaturesBar";
import NewsFeed from "../components/NewsFeed";
import Resources from "../components/Resources";
import Upgrades from "../components/Upgrades";

function Beginning() {
  return (
    <div className="grid grid-cols-1 text-3xl gap-7">
      <NewsFeed />
      <Upgrades />
      <FeaturesBar />
      <div className="grid grid-cols-[1fr,1.2fr] grid-rows-none">
        <Resources />
        <Buildings />
      </div>
    </div>
  );
}

export default Beginning;
