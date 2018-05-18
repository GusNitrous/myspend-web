import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ServiceActions from '../../../actions/Services';
import * as PaymentActions from '../../../actions/Payments';
import PageTitle from "../../shared/page-title/PageTitle";
import NavLink from "../../shared/nav-link/NavLink";
import ServiceList from "./service-list/ServiceList";
import swal from "sweetalert";

class Services extends Component {
    componentDidMount() {
        this.props.actions.loadServices();
    }

    /**
     * Фиксация данных об оплате.
     */
    onPayment = (service) => {
        this.props.paymentActions.preparePayment(service);
    }

    onRemove = (service) => {
        swal({
            text: "Вы уверены, что хотите удалить услугу?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.props.actions.deleteService(service._id);
            }
        });
    }

    /**
     * Отображение услуги для редактирования.
     */
    onEdit = (service) => {
        this.props.actions.editService(service);
    }

    render() {
        const { list } = this.props;

        return (
            <div className="services">
                {this.props.children ||
                    <div className="list">
                        <PageTitle pageTitle="Услуги"/>

                        <div className="row button-row">
                            <div className="col-xs-12">
                                <NavLink className="pull-right" to="/services/add">
                                    <span className="btn btn-primary btn-add">
                                        <i className="fa fa-plus"></i>
                                        <span>&nbsp;Добавить услугу</span>
                                    </span>
                                </NavLink>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12">
                                {(list) ?
                                    (list.length === 0 ?
                                    <div>Услуги ещё не добавлены</div> :
                                    <ServiceList
                                        onPayment={this.onPayment}
                                        onRemove={this.onRemove}
                                        onEdit={this.onEdit}
                                        list={list}
                                    />)
                                :
                                    <div>Загрузка данных...</div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.services;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ServiceActions, dispatch),
        paymentActions: bindActionCreators(PaymentActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services);