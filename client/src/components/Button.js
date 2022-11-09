import { memo } from "react";
function Button({
  text,
  textColor,
  bgColor,
  IcAfter,
  IcBefore,
  fullWidth,
  px,
  onClick,
}) {
  return (
    <button
      className={`py-2 ${
        px ? px : "px-4"
      } outline-none rounded-md flex items-center justify-center gap-1 hover:underline ${textColor} ${bgColor} ${
        fullWidth && "w-full"
      }`}
      onClick={onClick}
    >
      {IcBefore && (
        <span>
          <IcBefore />
        </span>
      )}
      {text}
      {IcAfter && (
        <span>
          <IcAfter />
        </span>
      )}
    </button>
  );
}

export default memo(Button);
