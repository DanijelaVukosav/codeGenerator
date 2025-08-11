import React, { useState, FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService, { LoginResponse } from '../authService/userService';
import '../styles/login.css';
import { useUser } from '../authService/UserProvider';
import { useAbility } from '../router/casl/AbilityContext';
import { HOME_ROUTE } from '../router/routes';
import { SystemUser } from '../authService/types';
import { PASSWORD_PATTERN_MESSAGES, PASSWORD_PATTERNS } from '../generalComponents';

export const Login: FC = () => {
    const { login } = useUser();
    const { ability } = useAbility();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [message, setMessage] = useState('');

    const [passwordErrors, setPasswordErrors] = useState({
        newPassword: '',
        confirmPassword: '',
        match: ''
    });

    const [isVisibleActivateForm, setVisibleActivateForm] = useState(false);
    const [loginResponse, setLoginResponse] = useState<LoginResponse>();

    const validatePassword = (password: string): string => {
        const pattern = new RegExp(PASSWORD_PATTERNS.STRONG);
        if (!password) {
            return 'Password is required';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!pattern.test(password)) {
            return PASSWORD_PATTERN_MESSAGES.STRONG;
        }
        return '';
    };

    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewPassword(value);

        const error = validatePassword(value);
        setPasswordErrors((prev) => ({
            ...prev,
            newPassword: error,
            match:
                value !== confirmNewPassword && confirmNewPassword ? 'Passwords do not match' : ''
        }));
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setConfirmNewPassword(value);

        const matchError = value !== newPassword && value ? 'Passwords do not match' : '';
        setPasswordErrors((prev) => ({
            ...prev,
            confirmPassword: value && !newPassword ? 'Please enter new password first' : '',
            match: matchError
        }));
    };

    const isPasswordValid = () => {
        return (
            newPassword &&
            confirmNewPassword &&
            !passwordErrors.newPassword &&
            !passwordErrors.confirmPassword &&
            !passwordErrors.match &&
            newPassword === confirmNewPassword
        );
    };

    const loginUser = (userData: LoginResponse) => {
        const userWithRoles: SystemUser = {
            ...userData,
            permissions: userData.authorities,
            can: userData.authorities.map((authority: string) => {
                return { subject: authority, action: [authority] };
            })
        };

        ability.update(userWithRoles.can);
        login(userWithRoles, {
            accessToken: userData.accessToken
        });
    };

    const handleLogin = (event: MouseEvent) => {
        event.preventDefault();
        setMessage('');
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
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            }
        );
    };

    const handleActivate = (event: MouseEvent) => {
        event.preventDefault();

        if (!loginResponse) {
            setMessage('Something went wrong!');
            return;
        }

        if (!isPasswordValid()) {
            setMessage('Please fix password validation errors before proceeding.');
            return;
        }

        setMessage('');
        AuthService.activateAccount(
            newPassword,
            loginResponse?.id,
            loginResponse?.accessToken
        ).then(
            () => {
                loginUser({ ...loginResponse, activate: true });
                navigate(HOME_ROUTE);
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            }
        );
    };

    return (
        <div className="login_form_wrapper">
            <div className="login_form_container">
                <div className="logo_container">
                    <img src={'/svg/login-icon1.png'} alt={'LOGIN ICON'} />
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
                            <div className="input_field_wrapper">
                                <img src={'/svg/login-username.png'} alt={'username'} />
                                <input
                                    placeholder="username"
                                    title="Input title"
                                    name="username"
                                    type="text"
                                    className="input_field"
                                    id="email_field"
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="input_container">
                            <label className="input_label" htmlFor="password_field">
                                Password
                            </label>
                            <div className="input_field_wrapper">
                                <img src={'/svg/login-password.png'} alt={'password'} />
                                <input
                                    placeholder="******"
                                    title="Input title"
                                    name="password"
                                    type="password"
                                    className="input_field"
                                    id="password_field"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                        </div>
                        {message && <p style={{ color: '#dc3545' }}>{message}</p>}
                        <button
                            title="Sign In"
                            type="submit"
                            className="sign-in_btn"
                            onClick={handleLogin}
                            disabled={!username || !password}>
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
                            <div className="input_field_wrapper">
                                <img src={'/svg/new-password.svg'} alt={'new pass'} />
                                <input
                                    type="password"
                                    name="fakePassword"
                                    style={{ display: 'none' }}
                                />
                                <input
                                    placeholder="******"
                                    title="Input title"
                                    name="newPassword"
                                    type="password"
                                    className={`input_field ${passwordErrors.newPassword ? 'input_error' : ''}`}
                                    id="newPassword"
                                    autoComplete="new-password"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                />
                            </div>
                            {passwordErrors.newPassword && (
                                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                                    {passwordErrors.newPassword}
                                </p>
                            )}
                        </div>
                        <div className="input_container">
                            <label className="input_label" htmlFor="confirmNewPassword">
                                Confirm Password
                            </label>
                            <div className="input_field_wrapper">
                                <img src={'/svg/new-password.svg'} alt={'password'} />
                                <input
                                    type="password"
                                    name="fakePassword"
                                    style={{ display: 'none' }}
                                />
                                <input
                                    placeholder="*******"
                                    title="Input title"
                                    name="confirmNewPassword"
                                    type="password"
                                    className={`input_field ${passwordErrors.confirmPassword || passwordErrors.match ? 'input_error' : ''}`}
                                    id="confirmNewPassword"
                                    autoComplete="new-password"
                                    value={confirmNewPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>
                            {(passwordErrors.confirmPassword || passwordErrors.match) && (
                                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                                    {passwordErrors.confirmPassword || passwordErrors.match}
                                </p>
                            )}
                        </div>

                        <div style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
                            <p>
                                <strong>Password requirements:</strong>
                            </p>
                            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                                <li>At least 8 characters long</li>
                                <li>At least one uppercase letter (A-Z)</li>
                                <li>At least one lowercase letter (a-z)</li>
                                <li>At least one number (0-9)</li>
                                <li>At least one special character (@$!%*?&)</li>
                            </ul>
                        </div>

                        {message && <p style={{ color: '#dc3545' }}>{message}</p>}
                        <button
                            title="Change Password"
                            type="submit"
                            className="sign-in_btn"
                            onClick={handleActivate}
                            disabled={!isPasswordValid()}>
                            <span>Change password</span>
                        </button>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};
