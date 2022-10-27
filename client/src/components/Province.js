import { memo } from "react";

function Province({ name, image }) {
  return (
    <div className="text-blue-700 shadow-md rounded-bl-md rounded-br-md cursor-pointer hover:text-orange-600">
      <img
        src={image}
        alt={name}
        className="w-[190px] h-[100px] object-cover rounded-tl-md rounded-tr-md"
      />
      <div className="text-center font-medium p-2">{name}</div>
    </div>
  );
}

export default memo(Province);
