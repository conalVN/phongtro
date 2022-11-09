/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { Button, Item } from "../../components";
import { getPostsLimit } from "../../store/actions/post";

function List({ categoryCode }) {
  const [sort, setSort] = useState(0);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    let searchParamsObj = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObj)?.some((item) => item === i[0])) {
        searchParamsObj[i[0]] = [...searchParamsObj[i[0]], i[1]];
      } else {
        searchParamsObj = { ...searchParamsObj, [i[0]]: [i[1]] };
      }
    });
    if (categoryCode) searchParamsObj.categoryCode = categoryCode;
    if (sort === 1) searchParamsObj.order = ["createdAt", "DESC"];
    dispatch(getPostsLimit(searchParamsObj));
  }, [searchParams, categoryCode, sort]);

  return (
    <div className="w-full p-2 bg-white shadow-md rounded-md">
      <div className="flex items-center justify-between my-3">
        <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
        <span>Cập nhật: 26/10/2022</span>
      </div>
      <div className="flex items-center gap-2 my-2">
        <span>Sắp xếp</span>
        <span
          onClick={() => setSort(0)}
          className={`bg-gray-200 p-2 cursor-pointer hover:underline ${
            sort === 0 && "text-red-500"
          }`}
        >
          Mặc định
        </span>
        <span
          onClick={() => setSort(1)}
          className={`bg-gray-200 p-2 cursor-pointer hover:underline ${
            sort === 1 && "text-red-500"
          }`}
        >
          Mới nhất
        </span>
      </div>
      <div className="items">
        {posts?.length > 0 &&
          posts.map((item) => {
            return (
              <Item
                key={item?.id}
                address={item?.address}
                attributes={item?.attributes}
                description={JSON.parse(item?.description)}
                images={JSON.parse(item?.images?.image)}
                star={+item?.star}
                title={item?.title}
                user={item?.user}
                id={item?.id}
              />
            );
          })}
      </div>
    </div>
  );
}

export default List;
