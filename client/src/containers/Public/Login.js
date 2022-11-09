/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Button, InputForm } from "../../components";
import * as actions from "../../store/actions";
import validate from "../../ultils/Common/validate";

function Login() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, msg, update } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    isLogin && navigate("/");
  }, [isLogin]);

  useEffect(() => {
    msg && Swal.fire("Oops !", msg, "error");
  }, [msg, update]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    let invalids = validate(finalPayload, setInvalidFields);
    if (invalids === 0) {
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
    }
  };

  return (
    <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl">
        {isRegister ? "Đăng kí tài khoản mới" : "Đăng nhập"}
      </h3>
      <form className="my-3 flex flex-col gap-3">
        {/* check is form register visible input */}
        {isRegister && (
          <InputForm
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label="Họ Tên"
            type="name"
            keyPayload="name"
            value={payload.name}
            setValue={setPayload}
          />
        )}
        <InputForm
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          label="Số Điện Thoại"
          type="phone"
          keyPayload="phone"
          value={payload.phone}
          setValue={setPayload}
        />
        <InputForm
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          label="Mật Khẩu"
          type="password"
          keyPayload="password"
          value={payload.password}
          setValue={setPayload}
          auto
        />
        <Button
          text={isRegister ? "Đăng kí" : "Đăng nhập"}
          textColor="text-white"
          bgColor="bg-secondary1"
          fullWidth
          onClick={handleSubmit}
        />

        <div className="mt-5 flex items-center justify-between">
          {isRegister ? (
            <small>
              Bạn đã có tài khoản?{" "}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => {
                  setIsRegister(false);
                  setPayload({
                    phone: "",
                    password: "",
                    name: "",
                  });
                }}
              >
                Đăng nhập ngay
              </span>
            </small>
          ) : (
            <>
              <small className="text-[blue] hover:text-[red] cursor-pointer">
                Bạn quên mật khẩu?
              </small>
              <small
                className="text-[blue] hover:text-[red] cursor-pointer"
                onClick={() => {
                  setIsRegister(true);
                  setPayload({
                    phone: "",
                    password: "",
                    name: "",
                  });
                }}
              >
                Tạo tài khoản mới
              </small>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
