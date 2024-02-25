import React, { useEffect, useState } from "react";
import "./App.css";
import { SideBar } from "./sidebar/SideBar";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/build/toastr.min.css";
import { Home } from "./Home";
{IMPORT_COMPONENTS_OF_TABLES}
import AuthService from "./loginService/auth.service";
import Login from "./loginComponents/Login";
import Register from "./loginComponents/Register";
import Profile from "./loginComponents/Profile";
import GuardedRoute from "./generalComponents/GuardedRoute";
import { isNil } from "lodash";
//import Index from "./components/index.component";
//import Edit from "./components/edit.component";
//import Create from "./components/create.component";
//import Home from "./components/home.component";

function App() {
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <React.Fragment>
      <Router>
        <div id="App">
          <SideBar links={{TABLES_ARRAY}} />

          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={"/"} className="nav-link">
                      Home
                    </Link>
                  </li>
                </ul>
              </div>
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser?.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </nav>{" "}
            <br />
            <Switch>
              {GUARDED_ROUTES_OF_TABLES}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
