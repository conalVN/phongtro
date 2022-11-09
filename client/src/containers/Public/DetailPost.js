/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams, useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../store/actions";
import { Slick, BoxUser, RelatedPost } from "../../components";
import icons from "../../ultils/icons";
import { path } from "../../ultils/constant";

const { GoLocation, VscTag, SlCrop, AiOutlineClockCircle } = icons;

function DetailPost() {
  const { posts } = useSelector((state) => state.post);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }));
  }, [postId]);

  const handleFilterLabel = () => {
    const titleSearch = `Tìm kiếm tin đăng theo chuyên mục ${posts[0]?.labelData?.value}`;
    navigate(
      {
        pathname: `/${path.SEARCH}`,
        search: createSearchParams({
          labelCode: posts[0]?.labelData?.code,
        }).toString(),
      },
      { state: { titleSearch } }
    );
  };
  return (
    <div className="flex gap-3 w-full">
      <div className="w-[70%]">
        <Slick
          images={
            posts && posts?.length > 0 && JSON.parse(posts[0]?.images?.image)
          }
        />
        <div className="bg-white p-4 shadow-md">
          <h2 className="text-2xl font-semibold text-red-500 my-2">
            {posts[0]?.title}
          </h2>
          <p>
            Chuyên mục:{" "}
            <span
              className="text-blue-600 underline font-semibold cursor-pointer hover:text-orange-500"
              onClick={handleFilterLabel}
            >
              {posts[0]?.labelData?.value}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <GoLocation color="#2563eb" />
            <span className="">{posts[0]?.address}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xl font-semibold text-green-600">
              <VscTag />
              {posts[0]?.attributes?.price}
            </span>
            <span className="flex items-center gap-2">
              <SlCrop />
              {posts[0]?.attributes?.acreage}
            </span>
            <span className="flex items-center gap-2">
              <AiOutlineClockCircle />
              {posts[0]?.attributes?.published}
            </span>
            <span>#{posts[0]?.attributes?.hashtag}</span>
          </div>
          <div className="">
            <h3 className="text-xl font-semibold my-4">Thông tin mô tả</h3>
            <div className="flex flex-col gap-3">
              {posts[0]?.description &&
                JSON.parse(posts[0]?.description)?.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
            </div>
          </div>
          <div className="">
            <h3 className="text-xl font-semibold my-2">Đặc điểm tin đăng</h3>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="p-2 w-[30%]">Mã tin</td>
                  <td className="p-2">{posts[0]?.overviews?.code}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-2">Khu vực</td>
                  <td className="p-2">{posts[0]?.overviews?.area}</td>
                </tr>
                <tr>
                  <td className="p-2">Loại tin rao</td>
                  <td className="p-2">{posts[0]?.overviews?.type}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-2">Đối tượng</td>
                  <td className="p-2">{posts[0]?.overviews?.target}</td>
                </tr>
                <tr>
                  <td className="p-2">Gói tin</td>
                  <td className="p-2">{posts[0]?.overviews?.bonus}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-2">Ngày đăng</td>
                  <td className="p-2">{posts[0]?.overviews?.created}</td>
                </tr>
                <tr>
                  <td className="p-2">Ngày hết hạn</td>
                  <td className="p-2">{posts[0]?.overviews?.expired}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="">
            <h3 className="text-xl font-semibold my-2">Thông tin liên hệ</h3>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="p-2 w-[30%]">Liên hệ</td>
                  <td className="p-2">{posts[0]?.user?.name}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="p-2">Điện thoại</td>
                  <td className="p-2">{posts[0]?.user?.phone}</td>
                </tr>
                <tr>
                  <td className="p-2">Zalo</td>
                  <td className="p-2">{posts[0]?.user?.zalo}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="">
            <h3 className="text-xl font-semibold my-2">Bản đồ</h3>
          </div> */}
        </div>
      </div>
      <div className="w-[30%] flex flex-col gap-6">
        <BoxUser info={posts[0]?.user} />
        <RelatedPost />
        <RelatedPost newPost />
      </div>
    </div>
  );
}

export default DetailPost;
