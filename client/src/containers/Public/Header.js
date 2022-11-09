/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, User } from "../../components";
import logo from "../../assets/logo-phongtro.svg";
import icons from "../../ultils/icons";
import { path } from "../../ultils/constant";
import manageAccount from "../../ultils/manageAccount";
import * as actions from "../../store/actions";

const { AiOutlinePlusCircle, BsChevronDown, AiOutlineLogout } = icons;

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const headerRef = useRef();
  const { isLogin } = useSelector((state) => state.auth);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("page")]);

  return (
    <div ref={headerRef} className="w-1100">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <img
            className="w-[240px] h-[70px] object-contain"
            src={logo}
            alt="logo"
          />
        </Link>
        <div className="flex items-center gap-1">
          {!isLogin && (
            <div className="flex items-center gap-1">
              <small>Phòng trọ Conal xin chào!</small>
              <Button
                text="Đăng nhập"
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => {
                  goLogin(false);
                }}
              />
              <Button
                text="Đăng kí"
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => {
                  goLogin(true);
                }}
              />
            </div>
          )}
          {isLogin && (
            <div className="relative flex items-center gap-1">
              <User />
              <Button
                text="Quản lí tài khoản"
                textColor="text-white"
                bgColor="bg-red-600"
                IcAfter={BsChevronDown}
                onClick={() => {
                  setIsShowMenu(!isShowMenu);
                }}
              />
              {isShowMenu && (
                <section className="absolute top-[100%] right-0 min-w-200 bg-white p-4 rounded-md shadow-sm flex flex-col">
                  {manageAccount.map((item) => {
                    return (
                      <Link
                        to={item.path}
                        key={item.id}
                        className="w-full flex items-center gap-2 text-blue-500 p-2 border-b border-gray-200 hover:text-orange-400"
                      >
                        {item?.icon}
                        {item.text}
                      </Link>
                    );
                  })}
                  <button
                    to="/logout"
                    className="w-full flex items-center gap-2 text-blue-500 text-start p-2 hover:text-orange-400"
                    onClick={() => {
                      dispatch(actions.logout());
                      setIsShowMenu(false);
                    }}
                  >
                    <AiOutlineLogout />
                    Đăng xuất
                  </button>
                </section>
              )}
            </div>
          )}
          <Button
            text="Đăng tin mới"
            textColor="text-white"
            bgColor="bg-secondary2"
            IcAfter={AiOutlinePlusCircle}
            onClick={() => navigate("he-thong/tao-bai-dang")}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
