import React, { useState, FC } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../authService/userService";
import "../styles/login.css";
import { useUser } from "../authService/UserProvider";
import { useAbility } from "../router/casl/AbilityContext";
import { HOME_ROUTE } from "../router/rotes";
import { SystemUser } from "../authService/types";

export const Login: FC = () => {
  const { login } = useUser();
  const { ability } = useAbility();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [message, setMessage] = useState("");

  const [isVisibleActivateForm, setVisibleActivateForm] = useState(false);
  const [loginResponse, setLoginResponse] = useState<any>();

  const loginUser = (userData: any) => {
    const userWithRoles: SystemUser = {
      ...userData,
      can: userData.authorities.map((authority: string) => {
        return { subject: authority, action: authority };
      }),
    };

    ability.update(userWithRoles.can as any);
    login(userWithRoles, { accessToken: userData.accessToken, refreshToken: userData.refreshToken });
  };
  const handleLogin = (event: any) => {
    event.preventDefault();
    setMessage("");
    AuthService.login(username, password).then(
      (response) => {
        if (response.activate) {
          loginUser(response);
          navigate(HOME_ROUTE);
        } else {
          setLoginResponse(response);
          setVisibleActivateForm(true);
        }
      },
      (error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setMessage(resMessage);
      },
    );
  };
  const handleActivate = (event: any) => {
    event.preventDefault();
    setMessage("");
    AuthService.activateAccount(newPassword, loginResponse?.id, loginResponse?.accessToken).then(
      () => {
        loginUser({ ...loginResponse, activate: true });

        navigate(HOME_ROUTE);
      },
      (error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setMessage(resMessage);
      },
    );
  };

  return (
    <div className="login_form_wrapper">
      <div className="login_form_container">
        <div className="logo_container">
          <img src={"/svg/login-icon1.png"} alt={"LOGIN ICON"} />
        </div>
        {!isVisibleActivateForm ? (
          <React.Fragment>
            <div className="title_container">
              <p className="title">Login to your Account</p>
            </div>
            <br />
            <div className="input_container">
              <label className="input_label" htmlFor="email_field">
                Username
              </label>
              <img src={"/svg/login-username.png"} alt={"username"} />
              <input
                placeholder="username"
                title="Inpit title"
                name="username"
                type="text"
                className="input_field"
                id="email_field"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="input_container">
              <label className="input_label" htmlFor="password_field">
                Password
              </label>
              <img src={"/svg/login-password.png"} alt={"password"} />
              <input
                placeholder="******"
                title="Inpit title"
                name="password"
                type="password"
                className="input_field"
                id="password_field"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {message && <p style={{ color: "#dc3545" }}>{message}</p>}
            <button title="Sign In" type="submit" className="sign-in_btn" onClick={handleLogin} disabled={!username || !password}>
              <span>Sign In</span>
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="title_container">
              <p className="title">Set new password!</p>
            </div>
            <br />
            <div className="input_container">
              <label className="input_label" htmlFor="newPassword">
                New password
              </label>
              <img src={"/svg/new-password.svg"} alt={"new pass"} />
              <input type="password" name="fakePassword" style={{ display: "none" }} />
              <input
                placeholder="******"
                title="Inpit title"
                name="newPassword"
                type="password"
                className="input_field"
                id="newPassword"
                autoComplete="new-password"
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </div>
            <div className="input_container">
              <label className="input_label" htmlFor="confirmNewPassword">
                Password
              </label>
              <img src={"/svg/new-password.svg"} alt={"password"} />
              <input type="password" name="fakePassword" style={{ display: "none" }} />
              <input
                placeholder="*******"
                title="Inpit title"
                name="confirmNewPassword"
                type="password"
                className="input_field"
                id="confirmNewPassword"
                autoComplete="new-password"
                onChange={(event) => setConfirmNewPassword(event.target.value)}
              />
            </div>
            {message && <p style={{ color: "#dc3545" }}>{message}</p>}
            <button title="Sign In" type="submit" className="sign-in_btn" onClick={handleActivate} disabled={newPassword !== confirmNewPassword}>
              <span>Change password</span>
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
