import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as PaymentActions from '../../../../actions/Payments';
import PageTitle from "../../../shared/page-title/PageTitle";
import PaymentForm from "./payment-form/PaymentForm";
import {browserHistory} from "react-router";

class Payment extends Component {
    componentWillMount() {
        const route = this.props.route;
        const dataPayment = this.props.payments.dataPayment;

        if (route.path === 'add' && !dataPayment) {
            browserHistory.push('/payments');
        }
    }

    /**
     * Обработка сохранения данных об оплате.
     */
    onSubmit = (values) => {
        this.props.actions.createPayment(values);
    }

    render() {
        const dataPayment = this.props.payments.dataPayment;
        const pageTitle = dataPayment ? "Оплата услуги | " + dataPayment.title : "Оплата услуги";

        return (
            <div className="service-payment">
                <PageTitle pageTitle={pageTitle}/>

                {(!dataPayment) ?
                <div>Загрузка...</div> :
                <div className="row form-row">
                    <div className="col-sm-12 col-md-10 col-lg-10">
                        <div className="panel panel-default panel-service-form">
                            <div className="panel-body">
                                <PaymentForm
                                    initValues={dataPayment}
                                    handleSubmit={this.onSubmit}
                                />
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Payment);