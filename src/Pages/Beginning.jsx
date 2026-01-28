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
      <div className="lg:grid lg:grid-cols-[1fr,1fr] lg:grid-rows-none flex flex-col">
        <Resources />
        <Buildings />
      </div>
    </div>
  );
}

export default Beginning;
