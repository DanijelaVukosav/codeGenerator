import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../../loginComponents/Login";

const PublicRouter = () => (
  <Router>
    <Routes>
      <Route path="*" element={<Login />} />
    </Routes>
  </Router>
);

export default PublicRouter;
