import axios from "../api/axios";
import { USER_LOCAL_STORAGE_KEY } from "./types";
import { API_ROUTES } from "../api/apiRoutes";

const login = async (username: string, password: string) => {
  const response = await axios.post(
    API_ROUTES.LOGIN,
    {
      username,
      password,
    },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  return response.data;
};
const activateAccount = async (newPassword: string, id: number, accessToken: string) => {
  return await axios.post(
    API_ROUTES.SYSTEM_USER_ACTIVATE,
    {
      newPassword,
      id,
    },
    {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    },
  );
};
const logout = () => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
};
const getUserDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY) ?? "");
};
const AuthService = {
  login,
  logout,
  activateAccount,
  getUserDataFromLocalStorage,
};
export default AuthService;
