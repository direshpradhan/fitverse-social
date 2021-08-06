import axios from "axios";
import { API_URL } from "../../constants";

export const getUserByUsernameService = async (username) => {
  return axios.post(`${API_URL}/user/${username}`);
};
