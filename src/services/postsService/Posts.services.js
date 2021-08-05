import axios from "axios";
import { API_URL } from "../../constants";

export const getAllPostsService = async () => {
  return axios.get(`${API_URL}/post`);
};

export const addNewPostService = async (content) => {
  return axios.post(`${API_URL}/post`, { content });
};

export const deletePostService = async (postId) => {
  return axios.delete(`${API_URL}/post/${postId}`);
};

export const getPostsByUsernameService = async (username) => {
  return axios.get(`${API_URL}/post/${username}`);
};

export const toggleLikeUnlikePostService = async (postId) => {
  return axios.post(`${API_URL}/post/${postId}/like`);
};

export const addCommentToPostService = async (postId, comment) => {
  return axios.post(`${API_URL}/post/${postId}/comment`, { comment });
};

export const deleteCommentFromPostService = async (postId, commentId) => {
  return axios.delete(`${API_URL}/post/${postId}/${commentId}`);
};
