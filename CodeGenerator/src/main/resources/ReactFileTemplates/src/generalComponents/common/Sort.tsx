import * as React from 'react';

export const SortIcon = () => (
    <svg
        width="24px"
        height="24px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: 'var(--primary-color)' }}>
        <rect width="16" height="16" fill="none" />
        <path d="M8,11.5L4.706,8.878l-1.416,1.416L8,14l4.706-3.706l-1.416-1.416L8,11.5z M8,4.5l3.294,2.622l1.416-1.416L8,2L3.294,5.706 l1.416,1.416L8,4.5z" />
    </svg>
);

export const SortUpIcon = () => (
    <svg
        width="24px"
        height="24px"
        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ fill: 'var(--primary-color)' }}>
        <rect width="16" height="16" id="icon-bound" fill="none" />
        <polygon points="3.414,11.414 8,6.828 12.586,11.414 14,10 8,4 2,10" />
    </svg>
);

export const SortDownIcon = () => (
    <svg
        width="24px"
        height="24px"
        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ fill: 'var(--primary-color)' }}>
        <rect width="16" height="16" id="icon-bound" fill="none" />
        <polygon points="12.586,4.586 8,9.172 3.414,4.586 2,6 8,12 14,6" />
    </svg>
);
