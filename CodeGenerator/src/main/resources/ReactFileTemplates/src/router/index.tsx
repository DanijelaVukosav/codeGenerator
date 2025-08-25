import React, { useEffect, useState } from "react";
import PublicRouter from "./components/PublicRouter";
import PrivateRouter from "./components/PrivateRouter";
import { useUser } from "../authService/UserProvider";
import { useAbility } from "./casl/AbilityContext";
import useAxiosPrivate from "../api/hooks/useAxiosPrivate";
import { isEmpty } from "lodash";
import { API_ROUTES } from "../api/apiRoutes";
import { SystemUser } from "../authService/types";

const AppIndex = () => {
  const { user, auth, login, loadUserAuthFromLocalStorage } = useUser();
  const { ability } = useAbility();

  const [loaded, setLoaded] = useState(false);
  const [sentUserRequest, setSentUserRequest] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    loadUserAuthFromLocalStorage();
  }, [loadUserAuthFromLocalStorage]);

  useEffect(() => {
    if (loaded || sentUserRequest || isEmpty(auth)) return;
    setSentUserRequest(true);
    const checkIsLoggedIn = async () => {
      try {
        const user = await axiosPrivate.get(API_ROUTES.SYSTEM_USER_DETAILS);
        if (user.status === 200) {
          const userWithRoles: SystemUser = {
            ...user.data,
            can: user.data.authorities.map((auth: { authority: string }) => {
              return { subject: auth.authority, action: auth.authority };
            }),
          };

          ability.update(userWithRoles.can);
          login(user.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoaded(true);
      }
    };
    void checkIsLoggedIn();
  }, [loaded, sentUserRequest, auth, axiosPrivate, ability, login]);

  return user && user.activate ? <PrivateRouter /> : <PublicRouter />;
};

export default AppIndex;
