import { memo } from "react";
import { Button } from "../components";
import noAvatar from "../assets/no-avatar.png";
import { BsFillTelephoneFill, BsHeart } from "react-icons/bs";

function BoxUser({ info }) {
  return (
    <div className="flex flex-col justify-center w-full bg-[#febb02] p-4 rounded-md gap-3">
      <img
        src={info?.avatar || noAvatar}
        alt="avatar"
        className="w-28 h-28 object-cover rounded-full m-auto"
      />
      <h3 className="text-center text-lg my-2 font-semibold">{info?.name}</h3>
      {/* <a href={`tel:0919244172`}> */}
      <Button
        IcBefore={BsFillTelephoneFill}
        text={info?.phone}
        bgColor="bg-[#16c784]"
        textColor="text-white font-semibold text-xl"
      />
      {/* </a> */}
      {/* <a href={`https://zalo.me/${info?.zalo}`}> */}
      <Button text="Nhắn Zalo" bgColor="bg-white" />
      {/* </a> */}
      <Button IcBefore={BsHeart} text="Yêu thích" bgColor="bg-white" />
    </div>
  );
}

export default memo(BoxUser);
