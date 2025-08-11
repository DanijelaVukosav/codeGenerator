import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../authService/userService';
import '../../styles/sidebar.css';
import { APPLICATION_ROUTES } from '../../router/routes';
import { useAbility } from '../../router/casl/AbilityContext';
import { useUser } from '../../authService/UserProvider';
import ThemeToggle from './ThemeToggle';

interface SideBarLink {
    key: string;
    path: string;
}

export const SideBar: React.FC = () => {
    const [hiddenMenu, setHiddenMenu] = React.useState(true);
    const { ability } = useAbility();
    const { user } = useUser();
    const navigate = useNavigate();

    const links: SideBarLink[] = useMemo(() => {
        const sideBarLinks: SideBarLink[] = [];
        if (ability.can('STUDENTS_READ', 'STUDENTS_READ')) {
            sideBarLinks.push({
                key: 'Students',
                path: APPLICATION_ROUTES.STUDENTS
            });
        }
        if (ability.can('INSTRUCTORS_READ', 'INSTRUCTORS_READ')) {
            sideBarLinks.push({
                key: 'Instructors',
                path: APPLICATION_ROUTES.INSTRUCTORS
            });
        }
        if (ability.can('ENROLLMENTS_READ', 'ENROLLMENTS_READ')) {
            sideBarLinks.push({
                key: 'Enrollments',
                path: APPLICATION_ROUTES.ENROLLMENTS
            });
        }
        if (ability.can('ASSIGNMENTS_READ', 'ASSIGNMENTS_READ')) {
            sideBarLinks.push({
                key: 'Assignments',
                path: APPLICATION_ROUTES.ASSIGNMENTS
            });
        }
        if (ability.can('COURSES_READ', 'COURSES_READ')) {
            sideBarLinks.push({
                key: 'Courses',
                path: APPLICATION_ROUTES.COURSES
            });
        }
        if (ability.can('SUBMISSIONS_READ', 'SUBMISSIONS_READ')) {
            sideBarLinks.push({
                key: 'Submissions',
                path: APPLICATION_ROUTES.SUBMISSIONS
            });
        }
        if (user?.superUser) {
            sideBarLinks.push({ key: 'system_users', path: APPLICATION_ROUTES.SYSTEM_USERS });
        }
        return sideBarLinks;
    }, [ability, user?.superUser]);

    const generateLink = (link: SideBarLink) => {
        return (
            <a
                key={link.key}
                className="nav-button"
                onClick={() => {
                    setHiddenMenu(true);
                    navigate(link.path);
                }}>
                <i className=" fas fa fa-cog" aria-hidden="true"></i>
                <span>{link.key.replaceAll('_', ' ').toLocaleUpperCase()}</span>
            </a>
        );
    };
    const logOut = () => {
        AuthService.logout();
        navigate(APPLICATION_ROUTES.LOGOUT);
    };

    return (
        <div id="nav-bar">
            <ThemeToggle isHiddenMenu={hiddenMenu} />
            <input id="nav-toggle" type="checkbox" checked={hiddenMenu} />
            <div id="nav-header" onClick={() => setHiddenMenu((state) => !state)}>
                <div>
                    <p id="nav-title">MENU</p>
                </div>

                <label htmlFor="nav-toggle">
                    <span id="nav-toggle-burger"></span>
                </label>
                <hr />
            </div>
            <div id="nav-content">{links.map(generateLink)}</div>
            <input id="nav-footer-toggle" type="checkbox" />
            <div id="nav-footer" onClick={logOut}>
                <div id="nav-footer-heading">
                    <div id="nav-footer-avatar">
                        <img src="/svg/logout.png" alt={'logout'} />
                    </div>
                    <div id="nav-footer-titlebox">LOGOUT</div>
                </div>
                <div id="nav-footer-content"></div>
            </div>
        </div>
    );
};
