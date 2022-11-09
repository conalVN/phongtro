import { memo } from "react";
import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";

import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";
import icons from "../ultils/icons";
const { GrNext } = icons;

function ItemSidebar({ content, title, isDouble, type }) {
  const location = useLocation();
  const navigate = useNavigate();
  const formatContent = () => {
    const oddEl = content?.filter((item, index) => index % 2 !== 0);
    const evenEl = content?.filter((item, index) => index % 2 === 0);
    const formatContent = oddEl?.map((item, index) => {
      return {
        right: item,
        left: evenEl?.find((item2, index2) => index2 === index),
      };
    });
    return formatContent;
  };
  const handleFilterPosts = (code) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({
        [type]: code,
      }).toString(),
    });
  };

  return (
    <div className="w-full p-4 bg-white rounded-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {!isDouble && (
        <div className="flex flex-col gap-2 ">
          {content?.length > 0 &&
            content.map((item) => {
              return (
                <Link
                  to={`${formatVietnameseToString(item.value)}`}
                  key={item.code}
                  className="flex gap-2 items-center cursor-pointer hover:text-orange-500 border-b border-gray-200 pb-1 border-dashed"
                >
                  <GrNext size={10} />
                  <p>{item.value}</p>
                </Link>
              );
            })}
        </div>
      )}
      {isDouble && (
        <div className="flex flex-col gap-2 ">
          {content?.length > 0 &&
            formatContent(content).map((item, index) => {
              return (
                <div key={index} className="flex gap-2 items-center">
                  <div className="w-full flex items-center border-b border-gray-200 pb-1 border-dashed">
                    <div
                      onClick={() => handleFilterPosts(item.left.code)}
                      className="flex flex-[50%] gap-2 items-center cursor-pointer hover:text-orange-500"
                    >
                      <GrNext size={10} />
                      <p>{item.left.value}</p>
                    </div>
                    <div
                      onClick={() => handleFilterPosts(item.right.code)}
                      className="flex flex-[50%] gap-2 items-center cursor-pointer hover:text-orange-500"
                    >
                      <GrNext size={10} />
                      <p>{item.right.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default memo(ItemSidebar);
