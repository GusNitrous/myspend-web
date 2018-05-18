import React from 'react';
import NavLink from "../../shared/nav-link/NavLink";
import './NavMenu.css';

const NavMenu = () => (
    <div className="nav-menu-container">
        <ul className="nav-menu">
            <li>
                <NavLink to="/locations">
                    <i className="fa fa-home fa-fw"></i>
                    <span>Адреса</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/services">
                    <i className="fa fa-sun-o fa-fw"></i>
                    <span>Услуги</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/payments">
                    <i className="fa fa-money fa-fw"></i>
                    <span>Платежи</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/stats">
                    <i className="fa fa-pie-chart fa-fw"></i>
                    <span>Статистика</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/user-profile">
                    <i className="fa fa-user fa-fw"></i>
                    <span>Профиль</span>
                </NavLink>
            </li>
        </ul>
    </div>
);

export default NavMenu;
