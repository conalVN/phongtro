import { SearchItem } from "../../components";
import icons from "../../ultils/icons";

const {
  BsChevronRight,
  CiLocationOn,
  VscTag,
  SlCrop,
  BiBuildingHouse,
  FiSearch,
} = icons;

function Search() {
  return (
    <div className="w-1100 my-3 p-[10px] bg-[#febb02] rounded-lg flex items-center justify-around gap-2">
      <SearchItem
        IcBefore={<BiBuildingHouse />}
        text="Phòng trọ, nhà trọ"
        fontWeight
        IcAfter={<BsChevronRight color="rgb(156, 163, 175" />}
      />
      <SearchItem
        IcBefore={<CiLocationOn />}
        text="Toàn quốc"
        IcAfter={<BsChevronRight color="rgb(156, 163, 175" />}
      />
      <SearchItem
        IcBefore={<VscTag />}
        text="Chọn giá"
        IcAfter={<BsChevronRight color="rgb(156, 163, 175" />}
      />
      <SearchItem
        IcBefore={<SlCrop />}
        text="Chọn diện tích"
        IcAfter={<BsChevronRight color="rgb(156, 163, 175" />}
      />
      <button className="py-2 px-4 bg-secondary1 text-white outline-none rounded-md w-full flex items-center justify-center gap-2">
        <FiSearch />
        Tìm kiếm
      </button>
    </div>
  );
}

export default Search;
