import React, { FC, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute } from "./WrappedRoute";
import { useUser } from "../../authService/UserProvider";
import { SideBar } from "../../generalComponents/sidebar/SideBar";
import { APPLICATION_ROUTES } from "../routes";
import { PageLoader } from "../../generalComponents";

const Dashboard = lazy(() => import("../../Home"));

const KorisniciIndex = lazy(() => import("../../pages/korisnici/KorisniciIndex"));
const KorisniciById = lazy(() => import("../../pages/korisnici/singlePage/KorisniciPage"));
const ProizvodiIndex = lazy(() => import("../../pages/proizvodi/ProizvodiIndex"));
const ProizvodiById = lazy(() => import("../../pages/proizvodi/singlePage/ProizvodiPage"));
const NarudzbeIndex = lazy(() => import("../../pages/narudzbe/NarudzbeIndex"));
const NarudzbeById = lazy(() => import("../../pages/narudzbe/singlePage/NarudzbePage"));

const IndexSystemUsers = lazy(() => import("../../systemUsers/SystemUserIndex"));

const PrivateRouter = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <SideBar />

        <Suspense>
          <Routes>
<Route path={APPLICATION_ROUTES.KORISNICI}
 element={ <ProtectedRoute subject={"KORISNICI_READ"}>
<Suspense fallback={<PageLoader />}>
                    <KorisniciIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.KORISNICI}/:id`}
              element={
                <ProtectedRoute subject={"KORISNICI_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <KorisniciById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.PROIZVODI}
 element={ <ProtectedRoute subject={"PROIZVODI_READ"}>
<Suspense fallback={<PageLoader />}>
                    <ProizvodiIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.PROIZVODI}/:id`}
              element={
                <ProtectedRoute subject={"PROIZVODI_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <ProizvodiById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
<Route path={APPLICATION_ROUTES.NARUDZBE}
 element={ <ProtectedRoute subject={"NARUDZBE_READ"}>
<Suspense fallback={<PageLoader />}>
                    <NarudzbeIndex />
                  </Suspense>
</ProtectedRoute>
              }
            />
<Route
              path={`${APPLICATION_ROUTES.NARUDZBE}/:id`}
              element={
                <ProtectedRoute subject={"NARUDZBE_READ"}>
                  <Suspense fallback={<PageLoader />}>
                    <NarudzbeById />
                  </Suspense>
                </ProtectedRoute>
              }
            />
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
