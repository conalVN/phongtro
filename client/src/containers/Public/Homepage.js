/* eslint-disable react-hooks/exhaustive-deps */
import { text } from "../../ultils/constant";
import { ProvinceGroup, ItemSidebar, RelatedPost } from "../../components";
import { List, Pagination } from "./index";
import { useSelector } from "react-redux";

function Homepage() {
  const { categories, prices, areas } = useSelector((state) => state.app);

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">{text.HOME_DESCRIPTION}</p>
      </div>
      <ProvinceGroup />
      <div className="w-full flex gap-4">
        <section className="w-[70%]">
          <List />
          <Pagination />
        </section>
        <aside className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar content={categories} title="Danh sách cho thuê" />
          <ItemSidebar isDouble type="priceCode" content={prices} title="Xem theo giá" />
          <ItemSidebar isDouble type="areaCode" content={areas} title="Xem theo diện tích" />
          <RelatedPost />
        </aside>
      </div>
    </div>
  );
}

export default Homepage;
