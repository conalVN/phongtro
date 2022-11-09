/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProvinceGroup, ItemSidebar, RelatedPost } from "../../components";
import { List, Pagination } from "./index";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";

function Rental() {
  const { prices, areas, categories } = useSelector((state) => state.app);
  const [categoryCode, setCategoryCode] = useState("");
  const [categoryCurrent, setCategoryCurrent] = useState({});
  const location = useLocation();

  useEffect(() => {
    const category = categories?.find(
      (item) => `/${formatVietnameseToString(item.value)}` === location.pathname
    );
    setCategoryCurrent(category);
    if (category) {
      setCategoryCode(category.code);
    }
  }, [location]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{categoryCurrent?.header}</h1>
        <p className="text-base text-gray-700">{categoryCurrent?.subheader}</p>
      </div>
      <ProvinceGroup />
      <div className="w-full flex gap-4">
        <section className="w-[70%]">
          <List categoryCode={categoryCode} />
          <Pagination />
        </section>
        <aside className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar
            isDouble
            type="priceCode"
            content={prices}
            title="Xem theo giá"
          />
          <ItemSidebar
            isDouble
            type="areaCode"
            content={areas}
            title="Xem theo diện tích"
          />
          <RelatedPost />
        </aside>
      </div>
    </div>
  );
}

export default Rental;
