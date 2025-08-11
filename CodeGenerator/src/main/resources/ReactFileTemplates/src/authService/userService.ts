import axios from "../api/axios";
import { USER_LOCAL_STORAGE_KEY } from "./types";
import { API_ROUTES } from "../api/apiRoutes";

export interface LoginResponse {
  refreshToken: string | null;
  id: number;
  username: string;
  email: string;
  superUser: boolean;
  authorities: string[];
  accessToken: string;
  tokenType: string;
  activate: boolean;
}

const login = async (username: string, password: string) => {
  const response = await axios.post<LoginResponse>(
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
  return axios.post(
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
