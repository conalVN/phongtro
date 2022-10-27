import { useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/Button";
import logo from "../../assets/logo-phongtro.svg";
import icons from "../../ultils/icons";
import { path } from "../../ultils/constant";
import * as actions from "../../store/actions";

const { AiOutlinePlusCircle } = icons;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-1100">
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
                onClick={() => goLogin(false)}
              />
              <Button
                text="Đăng kí"
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(true)}
              />
            </div>
          )}
          {isLogin && (
            <div className="flex items-center gap-1">
              <small>Phòng trọ Conal 'Name'!</small>
              <Button
                text="Đăng xuất"
                textColor="text-white"
                bgColor="bg-red-600"
                onClick={() => dispatch(actions.logout())}
              />
            </div>
          )}
          <Button
            text="Đăng tin mới"
            textColor="text-white"
            bgColor="bg-secondary2"
            IcAfter={AiOutlinePlusCircle}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
