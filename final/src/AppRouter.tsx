import React, { Component, Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";

//Products
// const Identity = lazy(() => import("./screens/Products/Identity"));

//Pages
const HomePage = lazy(() => import("./screens/Home/HomePage"));

const UploadFile = lazy(() => import("./screens/Upload/UploadDatabaseFile"));
const TablesControl = lazy(() => import("./screens/TablesControl/TablesControl"));
// const Policies = lazy(() => import("./screens/Content/Policies/Policies"));
// const Terms = lazy(() => import("./screens/Content/Policies/Terms"));
// const ContactUs = lazy(() => import("./screens/Others/ContactUs"));
// const AboutUs = lazy(() => import("./screens/Others/AboutUs"));
const NotFound = lazy(() => import("./screens/Others/NotFound"));

//User
// const AuthContainer = lazy(() => import("./screens/User/AuthContainer"));
// const CommsActivations = lazy(() => import("./screens/User/CommsActivations"));
// const ProtectedRoute = lazy(() => import("./components/common/ProtectedRoute"));
// const PasswordResetLink = lazy(() => import("./screens/User/PasswordResetLink"));
// const ChangePassword = lazy(() => import("./screens/User/ChangePassword"));
// const AccountInformation = lazy(() => import("./screens/Registration/AccountInformation"));
// const Onboarding = lazy(() => import("./screens/Registration/Onboarding"));
// const SwitchPlan = lazy(() => import("./screens/User/SwitchPlan"));

//Content
// const HowPellerexWorks = lazy(() => import("./screens/Content/Blog/Posts/Pellerex-Overview"));
// const BlogList = lazy(() => import("./screens/Content/Blog/BlogList"));
// const UrlRewrite = lazy(() => import("./screens/Content/Blog/Posts/API/UrlRewrite"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload-file" element={<UploadFile />} />
          <Route path="/tables-control" element={<TablesControl />} />

          {/* </Route> */}

          {/*User*/}
          {/* <Route path="/auth" component={AuthContainer} />
            <Route path="/request-password-reset-link" component={PasswordResetLink} />
            <Route path="/change-password" component={ChangePassword} />
            <Route path="/registration" component={Onboarding} />
            <Route path="/commsActivations" component={CommsActivations} />
            <Route exact path="/account-information" component={AccountInformation} /> */}

          {/*Blog*/}
          {/* <Route path="/blog/list" Component={BlogList} />
            <Route path="/blog/what-is-pellerex" Component={HowPellerexWorks} />
            <Route path="/blog/url-rewrite-aspnet-core" Component={UrlRewrite} /> */}

          {/*Products*/}
          {/* <Route path="/identity" component={Identity} /> */}

          {/*Others*/}
          {/* <Route path="/policies" component={Policies} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/terms" component={Terms} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
