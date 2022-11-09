/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as actions from "../../store/actions";
import { Button, UpdatePost } from "../../components";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";

function ManagePost() {
  const [isEdit, setIsEdit] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(0);
  const { postOfUser, dataEdit } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  // get post when CRUD dashboard admin
  useEffect(() => {
    !dataEdit && dispatch(actions.getPostsLimitAdmin());
  }, [dataEdit, updateData]);
  // set close module update
  useEffect(() => {
    !dataEdit && setIsEdit(false);
  }, [dataEdit]);
  // set data render post
  useEffect(() => {
    setPosts(postOfUser);
  }, [postOfUser]);

  const checkStatus = (dateString) =>
    moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      new Date().toDateString()
    );
  // handle click delete post
  const handleDeletePost = async (postId) => {
    const res = await apiDeletePost(postId);
    if (res?.data.err === 0) {
      setUpdateData(!updateData);
    } else {
      Swal.fire("Oops", "Xóa thất bại", "error");
    }
  };
  // filter post is active || expired
  useEffect(() => {
    if (status === 1) {
      const activePost = postOfUser?.filter((item) =>
        checkStatus(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(activePost);
    } else if (status === 2) {
      const expiredPost = postOfUser?.filter(
        (item) => !checkStatus(item?.overviews?.expired?.split(" ")[3])
      );
      setPosts(expiredPost);
    } else {
      setPosts(postOfUser);
    }
  }, [status]);
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold">Đăng tin mới</h2>
        <div className="flex">
          <select
            className="outline-none p-2 border border-gray-200 rounded-md"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Lọc theo trạng thái</option>
            <option value="1">Đang hoạt động </option>
            <option value="2">Đã hết hạn</option>
          </select>
        </div>
      </div>
      <table className="w-full text-center">
        <thead>
          <tr className="w-full h-16 bg-gray-300">
            <th>Mã tin</th>
            <th>Ảnh đại diện</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày hết hạn</th>
            <th>Trạng thái</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {!posts ? (
            <tr>
              <td>Bạn chưa có đăng tin nào</td>
            </tr>
          ) : (
            posts?.map((post) => {
              return (
                <tr key={post.id} className="h-16 border-b border-gray-200">
                  <td className="">{post?.overviews?.code}</td>
                  <td className="px-6">
                    <img
                      src={JSON.parse(post?.images?.image)[0] || ""}
                      alt="avatar"
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="truncate max-w-150">{post?.title}</td>
                  <td className="">{post?.attributes?.price}</td>
                  <td className="">{post?.overviews?.created}</td>
                  <td className="">{post?.overviews?.expired}</td>
                  <td className="">
                    {checkStatus(post?.overviews?.expired?.split(" ")[3])
                      ? "Đang hoạt động"
                      : "Đã hết hạn"}
                  </td>
                  <td className="">
                    <Button
                      text="Edit"
                      bgColor="bg-blue-400"
                      textColor="text-white"
                      px="px-6"
                      onClick={() => {
                        dispatch(actions.editPost(post));
                        setIsEdit(true);
                      }}
                    />
                    <Button
                      text="Delete"
                      bgColor="bg-red-600"
                      textColor="text-white"
                      // px="px-1"
                      onClick={() => handleDeletePost(post.id)}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
}

export default ManagePost;
