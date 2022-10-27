import { memo } from "react";

function SearchItem({ IcBefore, IcAfter, text, fontWeight }) {
  return (
    <div className="w-full bg-white py-2 px-4 rounded-md text-gray-500 text-sm flex items-center justify-between">
      <div className="flex items-center justify-center gap-1">
        {IcBefore}
        <span className={fontWeight && "font-medium text-black"}>{text}</span>
      </div>
      {IcAfter}
    </div>
  );
}

export default memo(SearchItem);
