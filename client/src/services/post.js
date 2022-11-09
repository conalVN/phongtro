import axios from "axios";
import axiosConfig from "../axiosConfig";

export const apiGetPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/post/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPostsLimit = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/limit`,
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetNewPosts = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/new-post`,
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUploadImages = (images) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        data: images,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreatePost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("Payload is: services: ", payload);
      const response = await axiosConfig({
        method: "post",
        url: "/api/v1/post/create-new",
        data: payload,
      });
      console.log("Responsive in services client: ", response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPostsLimitAdmin = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/limit-admin`,
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdatePost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: `/api/v1/post/update`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeletePost = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: `/api/v1/post/delete`,
        params: { postId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
