import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="">
      {/* <Arrow /> */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
