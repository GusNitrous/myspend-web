import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../../actions/Auth'
import { LOGIN_MODE, REGISTER_MODE} from "../../constants/AuthConst";
import LoginForm from "./login-form/LoginForm";
import RegisterForm from "./register-form/RegisterForm";
import SessionService from "../../services/SessionService";
import './Auth.css';
import Notification from "../notification/Notification";

const session = SessionService.getInstance();

/**
 * Компонент авторизации/регистрации.
 */
class Auth extends Component {
    static onEnter(nextState, replace) {
        if (session.isActive()) {
            replace('/locations');
        }
    }

    register = (values) => {
        const {email, password} = values;
        this.props.actions.register(email, password);
    }

    login = (values) => {
        const {email, password} = values;
        this.props.actions.login(email, password);
    }

    switchForm = () => {
        const mode = this.props.mode === REGISTER_MODE ? LOGIN_MODE : REGISTER_MODE
        this.props.actions.switchMode(mode);
    }

    render() {
        const { mode } = this.props;

        return (
            <div className="app-auth">
                <div className="panel panel-auth">
                    <div className="panel-heading">
                        <h1 className={`panel-title text-center`}>
                            {mode === LOGIN_MODE ? 'Вход в систему' : 'Регистрация'}
                        </h1>
                    </div>
                    <div className="panel-body">
                        {(mode === LOGIN_MODE) ?
                        <LoginForm onSubmit={this.login}/> :
                        <RegisterForm onSubmit={this.register}/>}
                    </div>
                    <div className="panel-footer switch-box">
                        <a onClick={this.switchForm}>
                            {mode === LOGIN_MODE ? 'Зарегистрироваться' : 'Уже есть аккаунт?'}
                        </a>
                    </div>
                </div>
                <Notification/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.auth;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);