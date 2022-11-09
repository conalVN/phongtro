/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import { Navigation, Search } from "./index";
import { Contact, Intro } from "../../components";
import { path } from "../../ultils/constant";

function Home() {
  const location = useLocation();
  const { isLogin } = useSelector((state) => state.auth);

  return (
    <div className="w-full h-full flex flex-col items-center gap-6">
      <Header />
      <Navigation />
      {isLogin &&
        location.pathname !== `/${path.CONTACT}` &&
        !location.pathname?.includes(path.DETAIL) && <Search />}
      <div className="w-1100 flex flex-col items-center justify-start">
        <Outlet />
      </div>
      <Intro />
      <Contact />
    </div>
  );
}

export default Home;
