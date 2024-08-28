import Buildings from "../components/Buildings";
import NewsFeed from "../components/NewsFeed";
import Resources from "../components/Resources";
import Upgrades from "../components/Upgrades";

function Beginning() {
  return (
    <div className="grid grid-cols-1 text-3xl gap-7">
      <NewsFeed />
      <Upgrades />
      <div className="flex justify-evenly mt-12 columns-2">
        <Resources />
        <Buildings />
      </div>
    </div>
  );
}

export default Beginning;
