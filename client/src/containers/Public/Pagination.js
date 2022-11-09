/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { PageNumber } from "../../components";
import icons from "../../ultils/icons";
import { useSearchParams } from "react-router-dom";

const { GrLinkNext } = icons;

function Pagination() {
  const { count, posts } = useSelector((state) => state.post); // get data from reducer redux
  const [arrPage, setArrPage] = useState([]); // setting total number of pages by total post
  const [currentPage, setCurrentPage] = useState(1); // get current page add active
  const [isHideStart, setIsHideStart] = useState(false); // set hide icon prev
  const [isHideEnd, setIsHideEnd] = useState(false); // set hide icon next
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let page = searchParams.get("page");
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    // page number total post / per-post
    let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT);
    let end = currentPage + 2 > maxPage ? maxPage : currentPage + 2;
    let start = currentPage - 2 <= 1 ? 1 : currentPage - 2;
    let temp = [];
    for (let i = start; i <= end; i++) temp.push(i);
    setArrPage(temp);
    currentPage >= maxPage - 2 ? setIsHideEnd(true) : setIsHideEnd(false);
    currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false);
  }, [count, posts, currentPage]);

  return (
    <div className="flex items-center justify-center gap-2 my-5">
      {!isHideStart && <PageNumber text={1} setCurrentPage={setCurrentPage} />}
      {!isHideStart && currentPage !== 4 && <PageNumber text="..." />}
      {arrPage.length > 0 &&
        arrPage.map((item) => {
          return (
            <PageNumber
              key={item}
              text={item}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          );
        })}
      {!isHideEnd && <PageNumber text="..." />}
      {!isHideEnd && (
        <PageNumber
          icon={<GrLinkNext />}
          text={Math.round(count / posts.length)}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default Pagination;
