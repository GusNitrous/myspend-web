import React, {Component} from 'react';
import {connect} from 'react-redux';
import PageTitle from "../../shared/page-title/PageTitle";
import InfoForm from "./info-form/InfoForm";
import PasswordForm from "./password-form/PasswordForm";
import SessionService from "../../../services/SessionService";
import {bindActionCreators} from "redux";
import * as UserActions from "../../../actions/Users";
import * as AuthActions from "../../../actions/Auth";
import "./UserProfile.css";
import UserCard from "./user-card/UserCard";
import * as savedTypes from '../../../constants/UserSavedTypes';
import swal from "sweetalert";

const session = SessionService.getInstance();

const INFO_TAB = 'infoTab';
const PASSWORD_TAB = 'passwordTab';

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: INFO_TAB,
            authData: session.getAuthData()
        }
    }

    componentDidMount() {
        const {authData} = this.state;

        if (authData) {
            this.props.actions.loadUserData(authData._id);
        }
    }

    componentDidUpdate() {
        const {savedType} = this.props;

        if (savedType) {
            this.handleResultSave(savedType);
        }
    }

    handleResultSave({msg, type}) {
        swal({
            text: msg,
            icon: "info"
        }).then(() => {
            this.props.actions.resetSavedType();

            if (type === savedTypes.USER_SAVED_WITH_EMAIL.type) {
                this.props.authActions.logout();
            }
        });
    }

    updateUserInfo = (values) => {
        this.props.actions.saveUserData(values);
    }

    updatePassword = (values) => {
        const {data} = this.props;

        if (data) {
            const updatePasswordData = {
                id: data._id,
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            }

            this.props.actions.updatePassword(updatePasswordData);
        }
    }

    switchTab = (e) => {
        e.preventDefault();
        this.setState({activeTab: e.target.id});
    }

    render() {
        const { data } = this.props;
        const { activeTab, authData } = this.state;

        return (
            <div>
                <PageTitle pageTitle="Профиль"/>

                <div className="row">
                    <UserCard userData={authData}/>

                    <div className="col-sm-12 col-md-8 col-lg-8">
                        <div className="panel panel-default panel-profile-edit">
                            <div className="panel-body">
                                <ul className="nav nav-tabs app-nav-justified">
                                    <li onClick={this.switchTab}
                                        className={activeTab === INFO_TAB ? "active" : ""}>
                                        <a id={INFO_TAB}>Основная информация</a>
                                    </li>
                                    <li onClick={this.switchTab}
                                        className={activeTab === PASSWORD_TAB ? "active" : ""}>
                                        <a id={PASSWORD_TAB}>Изменить пароль</a>
                                    </li>
                                </ul>

                                {(activeTab === INFO_TAB) ?
                                    <InfoForm
                                        initValues={data}
                                        onSubmit={this.updateUserInfo}
                                    />
                                :
                                    <PasswordForm
                                        onSubmit={this.updatePassword}
                                    />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.user;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UserActions, dispatch),
        authActions: bindActionCreators(AuthActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);