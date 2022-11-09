import { memo, useEffect, useState } from "react";
import icons from "../ultils/icons";
import { getNumbersPrice, getNumbersArea } from "../ultils/Common/getNumbers";

const { GrLinkPrevious } = icons;

function Modal({
  setIsShowModal,
  content,
  name,
  defaultText,
  queries,
  arrMinMax,
  handleSubmit,
}) {
  const [active, setActive] = useState();
  const [percent1, setPercent1] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[0]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[0]
      : 0
  );
  const [percent2, setPercent2] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[1]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[1]
      : 100
  );

  const handleClickTrack = (e) => {
    const track = document.getElementById("track");
    const trackRect = track.getBoundingClientRect();
    let percent = Math.round(
      ((e.clientX - trackRect.left) * 100) / trackRect.width
    );
    if (Math.abs(percent - percent1) <= Math.abs(percent - percent2)) {
      setPercent1(percent);
    } else {
      setPercent2(percent);
    }
  };

  useEffect(() => {
    const range = document.getElementById("track-active");
    if (range) {
      if (percent2 < percent1) {
        range.style.left = `${percent2}%`;
        range.style.right = `${100 - percent1}%`;
      } else {
        range.style.left = `${percent1}%`;
        range.style.right = `${100 - percent2}%`;
      }
    }
  }, [percent1, percent2]);

  const convert100toTarget = (percent) => {
    return name === "price"
      ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
      : name === "area"
      ? Math.ceil(Math.round(percent * 0.9) / 5) * 5
      : 0;
  };

  const convertto100 = (percent) => {
    let target = name === "price" ? 15 : name === "area" ? 90 : 1;
    return Math.floor((percent / target) * 100);
  };

  const handleActive = (code, value) => {
    const arr =
      name === "price" ? getNumbersPrice(value) : getNumbersArea(value);
    setActive(code);
    if (arr.length === 1) {
      if (arr[0] === 1) {
        setPercent1(0);
        setPercent2(convertto100(1));
      }
      if (arr[0] === 20) {
        setPercent1(0);
        setPercent2(convertto100(20));
      }
      if (arr[0] === 15 || arr[0] === 90) {
        setPercent1(100);
        setPercent2(100);
      }
    }
    if (arr.length === 2) {
      setPercent1(convertto100(arr[0]));
      setPercent2(convertto100(arr[1]));
    }
  };
  const handleSendSubmit = (e) => {
    let min = percent1 <= percent2 ? percent1 : percent2;
    let max = percent1 <= percent2 ? percent2 : percent1;
    let arrMinMax =
      percent1 === percent2 && percent1 === 100
        ? [convert100toTarget(min), Infinity]
        : [convert100toTarget(min), convert100toTarget(max)];
    handleSubmit(
      e,
      {
        [`${name}Number`]: arrMinMax,
        [name]: `Từ ${convert100toTarget(min)} ${
          percent1 === percent2 && percent1 === 100
            ? ""
            : `- ${convert100toTarget(max)}`
        } ${name === "price" ? "triệu" : "m2"}`,
      },
      {
        [`${name}Arr`]:
          percent1 === percent2 && percent1 === 100
            ? [min, Infinity]
            : [min, max],
      }
    );
  };
  return (
    <section
      className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex items-center justify-center"
      onClick={(e) => setIsShowModal(false)}
    >
      <div
        className="w-2/4 h-[500px] bg-white rounded-md p-4"
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(true);
        }}
      >
        <div className="h-[45px]">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setIsShowModal(false);
            }}
          >
            <GrLinkPrevious size={24} />
          </span>
        </div>
        {(name === "category" || name === "province") && (
          <div className="flex flex-col">
            <label
              htmlFor="default"
              className="py-2 flex gap-2 border-b border-gray-300 cursor-pointer"
            >
              <input
                type="radio"
                id="default"
                name={name}
                value={defaultText || ""}
                checked={!queries[`${name}Code`] ? true : false}
                onChange={(e) =>
                  handleSubmit(e, {
                    [name]: defaultText,
                    [`${name}Code`]: null,
                  })
                }
              />
              {defaultText}
            </label>
            {content?.map((item) => {
              return (
                <label
                  key={item.code}
                  htmlFor={item.code}
                  className="py-2 flex gap-2 border-b border-gray-300 cursor-pointer"
                >
                  <input
                    type="radio"
                    id={item.code}
                    name={name}
                    value={item.code}
                    checked={
                      item.code === queries[`${name}Code`] ? true : false
                    }
                    onChange={(e) =>
                      handleSubmit(e, {
                        [name]: item.value,
                        [`${name}Code`]: item.code,
                      })
                    }
                  />
                  {item.value}
                </label>
              );
            })}
          </div>
        )}
        {(name === "price" || name === "area") && (
          <div className="p-12">
            <div className="relative flex items-center justify-center">
              <div className="absolute top-[-48px] font-bold text-orange-600 text-2xl">
                {percent1 === 100 && percent2 === 100
                  ? `Trên ${convert100toTarget(percent1)} ${
                      name === "price" ? "triệu" : "m2"
                    }`
                  : `Từ ${
                      percent1 <= percent2
                        ? convert100toTarget(percent1)
                        : convert100toTarget(percent2)
                    } - 
                        ${
                          percent1 <= percent2
                            ? convert100toTarget(percent2)
                            : convert100toTarget(percent1)
                        } 
                        ${name === "price" ? "triệu" : "m2"}`}
              </div>
              <div
                id="track"
                className="bg-gray-400 w-full top-0 bottom-0 h-[5px] absolute slider-track rounded-md"
                onClick={handleClickTrack}
              ></div>
              <div
                id="track-active"
                className="bg-orange-500 right-0 left-0 top-0 bottom-0 h-[5px] absolute slider-track-active rounded-md"
                onClick={handleClickTrack}
              ></div>
              <input
                type="range"
                className="w-full pointer-events-none appearance-none absolute top-0 bottom-0"
                max="100"
                min="0"
                step="1"
                value={percent1}
                onChange={(e) => {
                  setPercent1(+e.target.value);
                  active && setActive("");
                }}
              />
              <input
                type="range"
                className="w-full pointer-events-none appearance-none absolute top-0 bottom-0"
                max="100"
                min="0"
                step="1"
                value={percent2}
                onChange={(e) => {
                  setPercent2(+e.target.value);
                  active && setActive("");
                }}
              />
              <div className="absolute top-[20px] left-[6px] right-[-24px] flex items-center justify-between">
                <span className="cursor-pointer" onClick={() => setPercent1(0)}>
                  0
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => setPercent2(100)}
                >
                  {name === "price"
                    ? "15 triệu +"
                    : name === "area"
                    ? "Trên 90m2"
                    : ""}
                </span>
              </div>
            </div>

            <div className="mt-24">
              <h4 className="font-medium mb-4">Chọn nhanh</h4>
              <div className="flex gap-1 flex-wrap items-center w-full">
                {content?.map((item) => {
                  return (
                    <button
                      key={item.code}
                      className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer 
                      ${active === item.code ? "bg-blue-400 text-white" : ""}`}
                      onClick={() => handleActive(item.code, item.value)}
                    >
                      {item.value}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {(name === "price" || name === "area") && (
          <button
            className="w-full py-2 font-medium bg-orange-400 rounded-md uppercase"
            onClick={handleSendSubmit}
          >
            Áp dụng
          </button>
        )}
      </div>
    </section>
  );
}

export default memo(Modal);
