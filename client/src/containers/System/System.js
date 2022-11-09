import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Header, Sidebar } from "../System";

function System() {
  const { isLogin } = useSelector((state) => state.auth);
  if (!isLogin) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className=" flex flex-col items-center overflow-hidden">
      <Header />
      <div className="w-full h-full flex flex-auto">
        <Sidebar />
        <div className=" flex-1 bg-white shadow-md p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default System;
