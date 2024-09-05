import React, { FC, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute } from "./WrappedRoute";
import { useUser } from "../../authService/UserProvider";
import { SideBar } from "../../generalComponents/sidebar/SideBar";
import { APPLICATION_ROUTES } from "../routes";
import { PageLoader } from "../../generalComponents";

const Dashboard = lazy(() => import("../../Home"));

#{APPLICATION_PRIVATE_ROUTER_IMPORT}#

const IndexSystemUsers = lazy(() => import("../../systemUsers/SystemUserIndex"));

const PrivateRouter = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <SideBar />

        <Suspense>
          <Routes>
            #{APPLICATION_PRIVATE_ROUTER_PATH}#
            <Route
              path={APPLICATION_ROUTES.SYSTEM_USERS}
              element={
                <ProtectedRoute subject={"SYSTEM_USERS"} onlyForSuperUser={true}>
                  <Suspense fallback={<PageLoader />}>
                    <IndexSystemUsers />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route path={APPLICATION_ROUTES.LOGOUT} element={<LogOutUserComponent />} />
            <Route path="/forbiden" element={<LogOutUserComponent />} />

            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
};

const LogOutUserComponent: FC = () => {
  const { logout } = useUser();
  logout();
  return <Navigate to={APPLICATION_ROUTES.LOGIN} />;
};

export default PrivateRouter;
