import moment from "moment";
import "moment/locale/vi";
import { AiFillStar } from "react-icons/ai";

function Sitem({ image, title, price, createdAt, star }) {
  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++)
      stars.push(<AiFillStar className="star-item" size={20} color="yellow" />);
    return stars;
  };
  return (
    <div className="w-full flex items-center gap-2 pb-2 border-b-2 border-gray-100">
      <img
        src={image[0]}
        alt="img"
        className="w-[65px] h-[65px] flex-none object-cover rounded-md"
      />
      <div className="w-full flex-auto">
        <h4 className="text-blue-600 text-[16px]">
          {handleStar(+star).length > 0 &&
            handleStar(+star).map((star, num) => {
              return <span key={num}>{star}</span>;
            })}
          {`${title?.slice(0, 40)}...`}
        </h4>
        <div className="flex items-center justify-between w-full">
          <p className="text-green-400 font-semibold">{price}</p>
          <p className="text-gray-300">{formatTime(createdAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default Sitem;
