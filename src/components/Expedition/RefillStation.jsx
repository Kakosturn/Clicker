function RefillStation({ meatBrought, maxMeatToBring, setMeatBrought }) {
  return (
    <div className="flex gap-2">
      <p>Meat :</p>
      <input
        type="text"
        value={meatBrought}
        onChange={(e) => setMeatBrought(e.target.value)}
        max={maxMeatToBring}
        className="bg-zinc-800 w-20"
      />
      <button className="" onClick={() => setMeatBrought(maxMeatToBring)}>
        Max
      </button>
    </div>
  );
}

export default RefillStation;
