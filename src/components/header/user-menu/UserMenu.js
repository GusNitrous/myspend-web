import React, {PureComponent} from 'react';
import NavLink from "../../shared/nav-link/NavLink";
import './UserMenu.css';
import $ from 'jquery';

/**
 * User dropdown menu.
 */
export default class UserMenu extends PureComponent {
    componentDidMount() {
        const userMenu = $('#userMenu');
        const dropdownMenu = $('#dropdownMenu');

        userMenu.click(function(e) {
            e.preventDefault();
            e.stopPropagation();

            $(this).toggleClass('active');

            if (userMenu.hasClass('active')) {
                dropdownMenu.show();
            } else {
                dropdownMenu.hide();
            }
        });

        $(document, dropdownMenu).click(function(e) {
            userMenu.removeClass('active');
            dropdownMenu.hide();
        });
    }

    render() {
        return (<div>
            <div id="userMenu" className="user-menu pull-right">
                <div className="profile-lable">
                    <i className="fa fa-user-circle"></i>
                </div>
            </div>
            <div id="dropdownMenu" className="dropdown-menu">
                <ul>
                    <li>
                        <NavLink
                            to="/user-profile">
                            <i className="fa fa-user"></i>
                            Профиль
                        </NavLink>
                    </li>
                    <li>
                        <a onClick={this.props.onClickLogout}>
                            <i className="fa fa-sign-out"></i>
                            Выйти
                        </a>
                    </li>
                </ul>
            </div>
        </div>)
    }
}