import { memo } from "react";
import Slider from "react-slick";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Slick({ images }) {
  return (
    <div className="">
      <Slider {...settings}>
        {images?.length > 0 &&
          images?.map((item, index) => {
            return (
              <div
                className="bg-black flex justify-center h-[320px] px-12"
                key={index}
              >
                <img
                  src={item}
                  alt="house"
                  className="object-contain m-auto h-full"
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
}

export default memo(Slick);
