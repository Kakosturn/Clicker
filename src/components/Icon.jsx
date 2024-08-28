function Icon({ path, width = "w-1/4" }) {
  return <img src={`./public/${path}`} alt="" className={`inline w-10`} />;
}

export default Icon;
