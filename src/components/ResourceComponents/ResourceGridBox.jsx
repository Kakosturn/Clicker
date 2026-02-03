function ResourceGridBox({ children }) {
  return (
    <div
      className="
        grid grid-cols-[1.4fr,1fr,2fr,1fr]
        items-center gap-5
        px-4 py-3
        rounded-xl
        bg-zinc-900/60
        
        shadow-lg
      "
    >
      {children}
    </div>
  );
}

export default ResourceGridBox;
