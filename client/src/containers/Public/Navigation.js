/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiGetCategories } from "../../services/category";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";

const notActive = "hover:bg-secondary2 bg-secondary1 px-4 py-2";
const active = "hover:bg-secondary2 bg-secondary2 px-4 py-2";

function Navigation() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiGetCategories();
      if (response?.data.err === 0) {
        setCategories(response.data.response);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-screen bg-secondary1 flex items-center justify-center">
      <nav className="w-1100 text-sm font-medium text-white flex items-center">
        <NavLink
          to={" "}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Trang Chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item) => {
            return (
              <div key={item.code}>
                <NavLink
                  to={`/${formatVietnameseToString(item.value)}`}
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
      </nav>
    </div>
  );
}

export default Navigation;
