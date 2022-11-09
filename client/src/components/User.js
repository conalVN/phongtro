import { useSelector } from "react-redux";
import noAvatar from "../assets/no-avatar.png";
import { blobToBase64 } from "../ultils/Common/toBase64";

function User() {
  const { currentData } = useSelector((state) => state.user);

  return (
    <>
      {Object.keys(currentData).length > 0 && (
        <div className="flex items-center">
          <img
            src={blobToBase64(currentData?.avatar) || noAvatar}
            alt="avatar"
            className="w-10 h-10 object-cover rounded-[50%] mr-2"
          />
          <div className="">
            <p>
              Xin chào{" "}
              <span className=" font-semibold">{currentData?.name}</span>!
            </p>
            <p>
              Mã tài khoản:{" "}
              <span className="font-semibold mr-2">{`${currentData?.id?.slice(
                0,
                6
              )}`}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default User;
