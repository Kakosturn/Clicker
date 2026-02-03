function Label({ children }) {
  return (
    <p
      className="
        flex items-center gap-2
        text-2xl font-semibold
        text-zinc-200
      "
    >
      {children}
    </p>
  );
}

export default Label;
