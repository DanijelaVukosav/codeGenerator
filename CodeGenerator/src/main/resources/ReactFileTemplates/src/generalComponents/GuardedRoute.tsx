import React, { FC } from 'react';
import { Route, Redirect } from "react-router-dom";

const GuardedRoute: FC<any> = ({ component:Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

export default GuardedRoute;