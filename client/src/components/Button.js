import { memo } from "react";
function Button({ text, textColor, bgColor, IcAfter, fullWidth, onClick }) {
  return (
    <button
      className={`py-2 px-4 outline-none rounded-md flex items-center justify-center gap-1 hover:underline ${textColor} ${bgColor} ${
        fullWidth && "w-full"
      }`}
      onClick={onClick}
    >
      {text}
      <span>{IcAfter && <IcAfter />}</span>
    </button>
  );
}

export default memo(Button);
