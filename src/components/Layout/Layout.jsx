import { useMainContext } from "../../context/MainContext";

function Layout({ children }) {
  return <div className="bg-[#202020]">{children}</div>;
}

export default Layout;
