import React, {PureComponent} from 'react';
import UserMenu from './user-menu/UserMenu';
import * as AuthActions from '../../actions/Auth';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import './Header.css';

class Header extends PureComponent {
    onLogout = (e) => {
        e.preventDefault();
        this.props.actions.logout();
    }

    render() {
        return (
            <div className="header">
                <div className="start-bar">
                    <i className="fa fa-hashtag"></i>
                    <span className="app-name">myspend</span>
                </div>

                <UserMenu onClickLogout={this.onLogout} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);