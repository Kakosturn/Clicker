function ResourceGridBox({ children }) {
  return (
    <div className="grid gap-5 grid-cols-[1.4fr,1fr,2fr,1fr]">{children}</div>
  );
}

export default ResourceGridBox;
