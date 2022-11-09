/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sitem } from "../components";
import * as actions from "../store/actions";

function RelatedPost({ newPost }) {
  const dispatch = useDispatch();
  const { newPosts, outStandingPost } = useSelector((state) => state.post);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    newPost
      ? dispatch(actions.getNewPosts())
      : dispatch(actions.getOutStandingPosts());
  }, []);
  useEffect(() => {
    newPost ? setPosts(newPosts) : setPosts(outStandingPost);
  }, [newPosts, outStandingPost]);
  return (
    <section className="w-full bg-white rounded-md py-4 px-2">
      <h3 className="font-semibold text-lg mb-4">
        {newPost ? "Tin mới đăg" : "Tin nổi bật"}
      </h3>
      <div className="flex flex-col gap-2">
        {posts?.map((item) => {
          return (
            <Sitem
              key={item.id}
              title={item?.title}
              image={JSON.parse(item.images?.image)}
              price={item?.attributes?.price}
              createdAt={item?.createdAt}
              star={item?.star}
            />
          );
        })}
      </div>
    </section>
  );
}

export default memo(RelatedPost);
