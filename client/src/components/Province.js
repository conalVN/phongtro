import { memo } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { path } from "../ultils/constant";

function Province({ name, image, provinceCode }) {
  const navigate = useNavigate();
  const handleFilter = () => {
    const titleSearch = `Cho thuê ${name}, Phòng trọ giá rẻ`;
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams({ provinceCode }).toString(),
      },
      { state: { titleSearch } }
    );
  };
  return (
    <div
      className="text-blue-700 shadow-md rounded-bl-md rounded-br-md cursor-pointer hover:text-orange-600"
      onClick={handleFilter}
    >
      <img
        src={image}
        alt={name}
        className="w-[190px] h-[100px] object-cover rounded-tl-md rounded-tr-md"
      />
      <div className="text-center font-medium p-2">{name}</div>
    </div>
  );
}

export default memo(Province);
