import React, { FC, useState, useContext, createContext, useEffect, useCallback } from "react";
import { AuthObject, Roles, SystemUser, USER_LOCAL_STORAGE_KEY } from "./types";
import { isEmpty } from "lodash";

export interface UserContextProps {
  user: SystemUser | null;
  roles: Roles | null;
  auth: AuthObject;
  setAuth: React.Dispatch<React.SetStateAction<AuthObject>>;
  login: (user: SystemUser, auth?: AuthObject) => void;
  logout: () => void;
  loadUserAuthFromLocalStorage: () => AuthObject;
}

const userContextDefaultValues: UserContextProps = {
  user: null,
  roles: null,
  auth: {},
  setAuth: () => {},
  login: (_user: SystemUser) => {},
  logout: () => {},
  loadUserAuthFromLocalStorage: () => {
    return {};
  },
};

const UserContext = createContext(userContextDefaultValues);

type Props = {
  children?: React.ReactNode;
};
const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<SystemUser | null>(null);
  const [roles, setRoles] = useState<Roles | null>(null);
  const [auth, setAuth] = useState<AuthObject>({});

  const login = (user: SystemUser, auth?: AuthObject) => {
    if (auth) {
      setAuth(auth);
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(auth));
    }
    setUser({ ...user });
    setRoles(user.authorities);
  };

  useEffect(() => {
    if (isEmpty(auth)) return;

    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(auth));
  }, [auth]);

  const logout = () => {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    setUser(null);
  };

  const loadUserAuthFromLocalStorage = useCallback(() => {
    if (!isEmpty(auth)) return ;
    const userFromLocalStorage = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if (userFromLocalStorage) {
      const userAuth = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY) ?? "");
      if (isEmpty(auth)) setAuth(userAuth);
      return userAuth;
    }
  },[auth, setAuth]);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        roles,
        auth,
        setAuth,
        loadUserAuthFromLocalStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
