import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as NotifyActions from "../../actions/Notifications";
import swal from "sweetalert";
import {bindActionCreators} from "redux";

class Notification extends Component {
    componentDidUpdate() {
        const { message } = this.props.notifications;

        if (message) {
            swal({
                text: message.text,
                icon: message.type
            }).then(() => {
                this.props.actions.hideNotify();
            }).catch(() => {
                this.props.actions.hideNotify();
            });
        }
    }

    render() {
        return null;
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(NotifyActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);