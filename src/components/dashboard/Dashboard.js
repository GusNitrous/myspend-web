import React, {Component} from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import SessionService from "../../services/SessionService";
import './Dashboard.css';
import Notification from "../notification/Notification";

const session = SessionService.getInstance();

export default class Dashboard extends Component {
    static onEnter(nextState, replace) {
        if (!session.isActive()) {
            replace('/auth');
        }
    }

    render() {
        return (
            <div className="app-container">
                <div className="wrapper">
                    <Header/>
                    <Sidebar/>
                    <div className="content-page">
                        <div className="content">
                            <div className="container-fluid">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
                <Notification/>
            </div>
        );
    }
}