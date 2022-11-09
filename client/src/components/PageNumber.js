import { memo } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const notActive =
  "w-[46px] h-[48px] flex items-center justify-center bg-white shadow-sm rounded-md hover:bg-gray-300 ";
const active =
  "w-[46px] h-[48px] flex items-center justify-center bg-[#E13427] text-white shadow-sm rounded-md hover:opacity-90 ";

function PageNumber({ text, icon, currentPage, setCurrentPage }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [paramsSearch] = useSearchParams();
  let entries = paramsSearch.entries();
  const append = (entries) => {
    let params = [];
    paramsSearch.append("page", +text);
    for (let entry of entries) {
      params.push(entry);
    }

    let searchParamsObj = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObj)?.some((item) => item === i[0] && item !== "page")) {
        searchParamsObj[i[0]] = [...searchParamsObj[i[0]], i[1]];
      } else {
        searchParamsObj = { ...searchParamsObj, [i[0]]: i[1] };
      }
    });

    return searchParamsObj;
  };

  const handleChangePage = () => {
    if (!(text === "...")) {
      setCurrentPage(+text);
      navigate({
        pathname: location?.pathname,
        search: createSearchParams(append(entries)).toString(),
      });
    }
  };
  return (
    <div
      className={
        +text === +currentPage
          ? `${active} ${text === "..." ? "cursor-text" : "cursor-pointer"}`
          : `${notActive} ${text === "..." ? "cursor-text" : "cursor-pointer"}`
      }
      onClick={handleChangePage}
    >
      {icon || text}
    </div>
  );
}

export default memo(PageNumber);
