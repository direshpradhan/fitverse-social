import axios from "axios";
import { API_URL } from "../../constants";

export const getAllUsersService = async () => {
  return axios.get(`${API_URL}/user/allUsers`);
};

export const getUserByUsernameService = async (username) => {
  return axios.get(`${API_URL}/user/${username}`);
};

export const followUserService = async (userToFollowId) => {
  return axios.post(`${API_URL}/user/follow/${userToFollowId}`);
};

export const unfollowUserService = async (userToUnfollowId) => {
  return axios.delete(`${API_URL}/user/follow/${userToUnfollowId}`);
};

export const getLoggedInUserService = async () => {
  return axios.get(`${API_URL}/user`);
};
