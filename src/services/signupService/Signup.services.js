import axios from "axios";
import { API_URL } from "../../constants";

export const signupService = (userDetails) => {
  return axios.post(`${API_URL}/signup`, { signupData: userDetails });
};
