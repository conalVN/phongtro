import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../components";
import { text } from "../ultils/data";
import icons from "../ultils/icons";
import { formatVietnameseToString } from "../ultils/Common/formatVietnameseToString";

const { AiFillStar } = icons;

function Intro() {
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="w-1100 bg-white rounded-md shadow-md p-4 pb-16 flex items-center justify-center flex-col gap-4">
      <h3 className="font-semibold text-lg">{text.title}</h3>
      <p className="text-gray-800 text-center my-4">
        {text.description}
        <span className="text-link">
          {categories.length > 0 &&
            categories.map((item) => {
              return (
                <Link
                  key={item.code}
                  to={`/${formatVietnameseToString(item.value)}`}
                  className="text-blue-600 font-medium hover:text-orange-600"
                >
                  {`${item.value.toLowerCase()}, `}
                </Link>
              );
            })}
        </span>
        {text.description2}
      </p>
      <div className="flex items-center justify-around w-full">
        {text.statistic.map((item, index) => {
          return (
            <div key={index} className="flex flex-col justify-center items-center">
              <h4 className="font-semibold text-lg">{item.value}</h4>
              <p className="text-gray-700">{item.name}</p>
            </div>
          );
        })}
      </div>
      <h3 className="font-semibold text-lg py-2">{text.price}</h3>
      <div className="flex items-center justify-center">
        <AiFillStar size={24} color="yellow" />
        <AiFillStar size={24} color="yellow" />
        <AiFillStar size={24} color="yellow" />
        <AiFillStar size={24} color="yellow" />
        <AiFillStar size={24} color="yellow" />
      </div>
      <p className="text-gray-600 italic text-center">{text.comment}</p>
      <span className="text-gray-700">{text.author_comment}</span>
      <h3 className="font-semibold text-lg py-2">{text.question}</h3>
      <span className="text-gray-700">{text.subdesc}</span>
      <Button text="Đăng kí ngay" bgColor="bg-secondary2" textColor="text-white" />
    </div>
  );
}

export default Intro;
