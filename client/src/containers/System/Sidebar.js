import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import noAvatar from "../../assets/no-avatar.png";
import * as actions from "../../store/actions";
import menuSidebar from "../../ultils/menuSidebar";
import { blobToBase64 } from "../../ultils/Common/toBase64";

const notActive =
  "flex items-center py-4 rounded-md gap-x-2 hover:bg-gray-200 hover:pl-4";
const active =
  "flex items-center pl-4 py-4 rounded-md gap-2 font-semibold bg-gray-200 hover:bg-gray-200";

function Sidebar() {
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  return (
    <aside className="w-[256px] h-full flex flex-col p-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-x-4">
          <img
            src={blobToBase64(currentData?.avatar) || noAvatar}
            alt="avatar"
            className="w-12 h-12 object-cover rounded-full border-2 border-white"
          />
          <div>
            <p className="font-semibold">{currentData?.name}</p>
            <small>{currentData?.phone}</small>
          </div>
        </div>
        <p>
          Mã thành viên:
          <span className="font-medium ml-2">
            {currentData?.id?.slice(0, 6)}
          </span>
        </p>
      </div>
      <div className="flex flex-col mt-4">
        {menuSidebar.map((item) => {
          return (
            <NavLink
              key={item.id}
              to={item?.path}
              className={({ isActive }) => (isActive ? active : notActive)}
            >
              {item?.icon}
              {item?.text}
            </NavLink>
          );
        })}
        <NavLink
          to={"/"}
          className={`flex items-center py-4 gap-x-2 rounded-md hover:bg-gray-200`}
          onClick={() => {
            dispatch(actions.logout());
          }}
        >
          <AiOutlineLogout />
          Đăng xuất
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
