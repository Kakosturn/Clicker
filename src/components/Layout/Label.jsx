function Label({ children }) {
  return (
    <div
      className="
        flex items-center gap-3
        text-lg font-bold
        text-gray-400
        tracking-wider
      "
    >
      {children}
    </div>
  );
}

export default Label;
