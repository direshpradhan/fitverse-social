import axios from "axios";
import { logoutUser } from "../features/authentication/authSlice";

export const interceptor = (store) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 403) {
        // logout();
        store.dispatch(logoutUser());
      }
      return Promise.reject(error);
    }
  );
};
