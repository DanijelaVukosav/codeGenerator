import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

export const SideBar: React.FC<{ links:string[] }> = ({ links }) => {

    const generateLink = (link: string) => {
        return (<Link className="menu-item" to={"/".concat(link)} >
            {link.toLocaleUpperCase()}
        </Link>);
    }
    return (
        <Menu>
              {links.map(generateLink)}
        </Menu>
    );
    
}