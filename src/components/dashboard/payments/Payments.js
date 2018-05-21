import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as PaymentActions from '../../../actions/Payments';
import PageTitle from "../../shared/page-title/PageTitle";
import PaymentList from "./payment-list/PaymentList";

class Payments extends Component {
    componentDidMount() {
        const { route } = this.props;

        if (route.path !== 'add') {
            this.props.actions.loadPayments();
        }
    }

    render() {
        const { list } = this.props.payments;

        return (
            <div className="payments">
                {this.props.children ||
                <div className="list">
                    <PageTitle pageTitle="Платежи"/>

                    {(list) ?
                        (list.length === 0 ?
                            <div>Данные о платежах отсутствуют</div> :
                            <PaymentList list={list}/>
                        )
                    :
                        <div>Загрузка данных...</div>
                    }
                </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(PaymentActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments);