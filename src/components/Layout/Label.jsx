function Label({ children }) {
  return (
    <div
      className="
        flex items-center gap-2
        text-2xl font-semibold
        text-zinc-200
      "
    >
      {children}
    </div>
  );
}

export default Label;
