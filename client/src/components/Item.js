import { memo, useState } from "react";
import { Link } from "react-router-dom";

import noAvatar from "../assets/no-avatar.png";
import icons from "../ultils/icons";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";
import { path } from "../ultils/constant";

const { AiFillStar, AiFillHeart, AiOutlineHeart } = icons;

function Item({
  id,
  images,
  star,
  title,
  address,
  attributes,
  description,
  user,
}) {
  let newAddress = address.split(",");
  const [isHeart, setIsHeart] = useState(false);
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++)
      stars.push(<AiFillStar className="star-item" size={20} color="yellow" />);
    return stars;
  };
  return (
    <div className="w-full flex p-2 border-t border-orange-500">
      <Link
        to={`${path.DETAIL}${formatVietnameseToString(
          title?.replaceAll("/", "")
        )}/${id}`}
        className="w-2/5 flex flex-wrap items-center gap-[2px] relative cursor-pointer"
      >
        {images.length > 0 &&
          images !== false &&
          images
            .filter((i, index) => [...Array(4).keys()].some((i) => i === index))
            ?.map((i, index) => {
              return (
                <img
                  key={index}
                  src={i}
                  alt="preview"
                  className="w-[140px] h-[120px] object-cover"
                />
              );
            })}
        <span className="absolute px-2 text-white bg-overlay-70 rounded-md left-1 bottom-1">
          {`${images.length} ảnh`}
        </span>
        <span
          className="absolute text-white bottom-1 right-3"
          onMouseEnter={() => setIsHeart(true)}
          onMouseLeave={() => setIsHeart(false)}
        >
          {isHeart ? (
            <AiFillHeart size={24} color="red" />
          ) : (
            <AiOutlineHeart size={24} />
          )}
        </span>
      </Link>
      <div className="w-3/5">
        <div className="flex justify-between">
          {handleStar(+star).length > 0 &&
            handleStar(+star).map((star, num) => {
              return <span key={num}>{star}</span>;
            })}
          <Link
            to={`${path.DETAIL}${formatVietnameseToString(
              title?.replaceAll("/", "")
            )}/${id}`}
            className="text-red-400 font-medium uppercase cursor-pointer"
          >
            {title}
          </Link>
        </div>
        <div className="my-2 flex items-center justify-between">
          <span className="flex-3 text-ellipsis overflow-hidden whitespace-nowrap font-bold text-green-500">
            {attributes?.price}
          </span>
          <span className="flex-1 text-ellipsis overflow-hidden">
            {attributes?.acreage}
          </span>
          <span className="flex-3 text-ellipsis overflow-hidden whitespace-nowrap">
            {`${newAddress[newAddress.length - 2]}, ${
              newAddress[newAddress.length - 1]
            }`}
          </span>
        </div>
        <p className="text-gray-500 w-full h-[50px] text-ellipsis break-words overflow-hidden">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-5 overflow-hidden flex-1">
            <img
              src={user.avatar ?? noAvatar}
              alt="avatar"
              className="w-[30px] h-[30px] object-cover rounded-[50%]"
            />
            <p className="text-ellipsis whitespace-nowrap overflow-hidden">
              {user?.name}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-1">
            <button className="bg-blue-700 text-white rounded-md p-1">{`Call ${user?.phone}`}</button>
            <a
              href={`https://zalo.me/${user?.zalo}`}
              className="text-blue rounded-md p-1 border border-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nhắn zalo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Item);
