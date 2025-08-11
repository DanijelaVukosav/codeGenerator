import * as React from 'react';
import '../../styles/singlePage.css';
import '../../styles/utils.css';
import { FC, ReactNode } from 'react';

export const SinglePageWrapper: FC<{ children: ReactNode; simpleView: boolean }> = ({
    children,
    simpleView
}) => {
    return (
        <div
            className="single_page_wrapper"
            style={simpleView ? { paddingLeft: '30px', paddingTop: '10px' } : {}}>
            <div style={{ width: '100%' }}>{children}</div>
        </div>
    );
};
