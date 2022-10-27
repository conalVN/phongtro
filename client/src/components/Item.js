import { memo, useState } from "react";
import icons from "../ultils/icons";

const images = [
  "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/10/23/z3822293383620-350e635be1af3f2614137f7d368a22b0_1666506996.jpg",
  "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/10/23/z3822293370794-383b8cc7099821254aa82b899ac1f559_1666506995.jpg",
  "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/10/23/z3822293375053-631025c76fa5a34062645617208e35de_1666506995.jpg",
  "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/10/23/z3822293377433-7feeb9b4d8cfa1993fc458072f77a192_1666506995.jpg",
];

const { AiFillStar, AiFillHeart, AiOutlineHeart } = icons;

function Item() {
  const [isHeart, setIsHeart] = useState(false);
  return (
    <div className="w-full flex p-2 border-t border-orange-500">
      <div className="w-2/5 flex flex-wrap items-center gap-[2px] relative cursor-pointer">
        <img
          src={images[0]}
          alt="preview"
          className="w-[140px] h-[120px] object-cover"
        />
        <img
          src={images[1]}
          alt="preview"
          className="w-[140px] h-[120px] object-cover"
        />
        <img
          src={images[2]}
          alt="preview"
          className="w-[140px] h-[120px] object-cover"
        />
        <img
          src={images[3]}
          alt="preview"
          className="w-[140px] h-[120px] object-cover"
        />
        <span className="absolute px-2 text-white bg-overlay-70 rounded-md left-1 bottom-1">
          4 picture
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
      </div>
      <div className="w-3/5">
        <div className="flex justify-between">
          <AiFillStar className="star-item" size={20} color="yellow" />
          <AiFillStar className="star-item" size={20} color="yellow" />
          <AiFillStar className="star-item" size={20} color="yellow" />
          <AiFillStar className="star-item" size={20} color="yellow" />
          <span className="text-red-400 font-medium uppercase">
            Khai trương căn hộ cao cấp full nội thất ở Đường Quảng Hàm, Phường
            5, Quận Gò Vấp
          </span>
        </div>
        <div className="my-2 flex items-center justify-between">
          <span className="font-bold text-green-500">7 triệu/tháng</span>
          <span>35m²</span>
          <span>Quận Gò Vấp, Hồ Chí Minh</span>
        </div>
        <p className="text-gray-500">
          Dương quảng hàm phường 5 quận gò vấp- Có 3 loại: phòng 4 giường, phòng
          6 giường, phòng 8 giường- Giá bao tất cả các phí, bao cả điện nước-
          Phù…
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-5">
            <img
              src={
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.FPUpHLVgDsBeEYFhhgs6BgHaHa%26pid%3DApi&f=1&ipt=8303594d9ed5051100bc3910005d411712023d2168a5304efa2ac86eda266ad2&ipo=images"
              }
              alt="no"
              className="w-[30px] h-[30px] object-cover"
            />
            <p>Ngô Gia Cường</p>
          </div>
          <div className="flex items-center gap-1">
            <button className="bg-blue-700 text-white rounded-md p-1">
              Call 0132456789
            </button>
            <button className="text-blue rounded-md p-1 border border-blue-700">
              Nhắn zalo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Item);
