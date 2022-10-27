import * as postService from "../services/post";

export const getPosts = async (req, res) => {
  try {
    const response = await postService.getPostsService();
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail",
    });
  }
};
