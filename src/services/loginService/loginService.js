import { API_URL } from "../../constants";
import axios from "axios";

export const loginService = async (email, username, password) => {
  return axios.post(`${API_URL}/login`, {
    email,
    username,
    password,
  });
  // console.log(loginResponse);
  // return loginResponse;
};
