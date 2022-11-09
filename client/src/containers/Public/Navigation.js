/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import { path } from "../../ultils/constant";

const active = "h-full bg-secondary2 px-4 py-3 hover:bg-secondary2";
const notActive = "h-full bg-secondary1 px-4 py-3 hover:bg-secondary2";

function Navigation({ isAdmin }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);

  return (
    <div
      className={`w-full bg-secondary1 flex items-center ${
        isAdmin ? "justify-start" : "justify-center"
      }`}
    >
      <nav className="w-1100 text-sm font-medium text-white flex items-center">
        <NavLink
          to={"/ "}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Trang Chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item) => {
            return (
              <NavLink
                key={item.code}
                to={`/${formatVietnameseToString(item.value)}`}
                className={({ isActive }) => (isActive ? active : notActive)}
              >
                {item.value}
              </NavLink>
            );
          })}
        <NavLink
          to={path.CONTACT}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Liên hệ
        </NavLink>
      </nav>
    </div>
  );
}

export default Navigation;
