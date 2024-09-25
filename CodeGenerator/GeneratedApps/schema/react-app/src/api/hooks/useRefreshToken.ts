import { useUser } from "../../authService/UserProvider";
import axios from "../axios";
import { API_ROUTES } from "../apiRoutes";

const useRefreshToken = () => {
  const { setAuth, logout, auth } = useUser();

  return async () => {
    try {
      const response = await axios.post(
        API_ROUTES.REFRESH_TOKEN,
        { refreshToken: auth.refreshToken },
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        setAuth({ refreshToken: response.data.refreshToken, accessToken: response.data.accessToken });
      } else {
        logout();
      }

      return response.data.accessToken;
    } catch (ex) {
      logout();
    }
    return null;
  };
};

export default useRefreshToken;
