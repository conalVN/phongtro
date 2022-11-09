/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { SearchItem, Modal } from "../../components";
import { path } from "../../ultils/constant";
import icons from "../../ultils/icons";

const {
  BsChevronRight,
  GoLocation,
  VscTag,
  SlCrop,
  BiBuildingHouse,
  FiSearch,
} = icons;

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prices, areas, provinces, categories } = useSelector(
    (state) => state.app
  );
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [name, setName] = useState();
  const [queries, setQueries] = useState({});
  const [arrMinMax, setArrMinMax] = useState({});
  const [defaultText, setDefaultText] = useState("");

  useEffect(() => {
    if (!location?.pathname.includes(path.SEARCH)) {
      setArrMinMax({});
      setQueries({});
    }
  }, [location]);

  const handleShowModal = (content, name, defaultText) => {
    setName(name);
    setContent(content);
    setDefaultText(defaultText);
    setIsShowModal(true);
  };
  const handleSubmit = useCallback(
    (e, query, arrMinMax) => {
      e.stopPropagation();
      setQueries((prev) => ({ ...prev, ...query }));
      setIsShowModal(false);
      arrMinMax && setArrMinMax((prev) => ({ ...prev, ...arrMinMax }));
    },
    [isShowModal, queries]
  );

  const handleSearch = () => {
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Code") || item[0].includes("Number"))
      .filter((item) => item[1]);
    let queryCodeObj = {};
    queryCodes.forEach((item) => {
      queryCodeObj[item[0]] = item[1];
    });
    const queryText = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") || !item[0].includes("Number")
    );
    let queryTextObj = {};
    queryText.forEach((item) => {
      queryTextObj[item[0]] = item[1];
    });
    let titleSearch = `${
      queryTextObj.category ? queryTextObj.category : "Cho thuê tất cả"
    } 
    ${queryTextObj.province ? `tỉnh ${queryTextObj.province}` : ""} 
    ${queryTextObj.price ? `giá ${queryTextObj.price}` : ""}
    ${queryTextObj.area ? `diện tích ${queryTextObj.area}` : ""}`;

    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams(queryCodeObj).toString(),
      },
      { state: { titleSearch } }
    );
    console.log(queryCodeObj);
  };
  return (
    <>
      <div className="w-1100 my-3 p-[10px] bg-[#febb02] rounded-lg flex items-center justify-around gap-2">
        <span
          className="flex-1"
          onClick={() => handleShowModal(categories, "category", "Tìm tất cả")}
        >
          <SearchItem
            IcBefore={<BiBuildingHouse />}
            text={queries.category}
            defaultText="Tìm tất cả"
            IcAfter={<BsChevronRight color="rgb(156, 163, 175" />}
            fontWeight
          />
        </span>
        <span
          className="flex-1"
          onClick={() => handleShowModal(provinces, "province", "Toàn quốc")}
        >
          <SearchItem
            IcBefore={<GoLocation />}
            text={queries.province}
            defaultText="Toàn quốc"
            IcAfter={<BsChevronRight color="rgb(156, 163, 175" />}
          />
        </span>
        <span
          className="flex-1"
          onClick={() => handleShowModal(prices, "price", "Chọn giá")}
        >
          <SearchItem
            IcBefore={<VscTag />}
            text={queries.price}
            defaultText="Chọn giá"
            IcAfter={<BsChevronRight color="rgb(156, 163, 175" />}
          />
        </span>
        <span
          className="flex-1"
          onClick={() => handleShowModal(areas, "area", "Chọn diện tích")}
        >
          <SearchItem
            IcBefore={<SlCrop />}
            text={queries.area}
            defaultText="Chọn diện tích"
            IcAfter={<BsChevronRight color="rgb(156, 163, 175" />}
          />
        </span>
        <button
          className="py-2 px-4 bg-secondary1 text-white outline-none rounded-md flex flex-1 items-center justify-center gap-2"
          onClick={handleSearch}
        >
          <FiSearch />
          Tìm kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal
          content={content}
          name={name}
          defaultText={defaultText}
          queries={queries}
          arrMinMax={arrMinMax}
          setIsShowModal={setIsShowModal}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default Search;
