import React, { useState, useRef, FC } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../loginService/auth.service";
const required = (value:any) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export const Login: FC  = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeUsername = (event:any) => {
    const username = event.target.value;
    setUsername(username);
  };
  const onChangePassword = (event:any) => {
    const password = event.target.value;
    setPassword(password);
  };
  const handleLogin = (event:any) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);
      AuthService.login(username, password).then(
        () => {
          history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
  };
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading} onClick={handleLogin}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};
export default Login;
