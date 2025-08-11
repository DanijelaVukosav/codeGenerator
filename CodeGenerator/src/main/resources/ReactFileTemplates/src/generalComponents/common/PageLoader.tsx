import * as React from 'react';
import '../../styles/loader.css';
import { FC } from 'react';

export const PageLoader: FC = () => {
    return (
        <div className="loader_wrapper">
            <div className="loader"></div>
        </div>
    );
};
