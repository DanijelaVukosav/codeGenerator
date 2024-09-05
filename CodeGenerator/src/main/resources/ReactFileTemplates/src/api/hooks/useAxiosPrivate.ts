import { useEffect, useRef } from "react";
import useRefreshToken from "./useRefreshToken";
import { useUser } from "../../authService/UserProvider";
import { axiosPrivate } from "../axios";
import { isEmpty } from "lodash";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useUser();

  const authRef = useRef(auth);

  useEffect(() => {
    authRef.current = auth;
  }, [auth]);

  useEffect(() => {
    if (!authRef.current || isEmpty(authRef.current)) return;

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!authRef?.current || isEmpty(authRef.current)) return config;
        config.headers["Authorization"] = `Bearer ${authRef?.current?.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          if (newAccessToken) {
            authRef.current = { accessToken: newAccessToken };
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          }
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authRef, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
