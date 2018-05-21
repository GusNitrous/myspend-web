import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PageTitle from "../../shared/page-title/PageTitle";
import LocationPanel from "./location-panel/LocationPanel";
import LocationModal from "./location-modal/LocationModal";
import swal from "sweetalert";
import * as LocationActions from '../../../actions/Locations';
import * as ServiceActions from '../../../actions/Services';
import * as PaymentActions from "../../../actions/Payments";
import './Locations.css';

class Locations extends Component {
    componentDidMount() {
        this.props.actions.getAll();
        this.props.serviceActions.loadServices();
    }

    showModal = () => {
        this.props.actions.showModal();
    }

    closeModal = () => {
        this.props.actions.closeModal();
    }

    onSaveData = (data) => {
        if (data) {
            if (data._id) {
                this.props.actions.updateLocation(data);
            } else {
                this.props.actions.createLocation(data);
            }
        }
    }

    /**
     * Отображение адреса для редактирования.
     */
    editLocation = (location) => {
        this.props.actions.editLocation(location);
    }

    deleteLocation = (location) => {
        swal({
            text: "Вы уверены, что хотите удалить адрес?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.props.actions.deleteLocation(location._id);
            }
        });
    }

    /**
     * Переход к оплате услуги.
     */
    onPaymentService = (service) => {
        this.props.paymentActions.preparePayment(service);
    }

    render() {
        const {showModal, list, location} = this.props.locations;
        const services = this.props.services.list;

        return (
            <div className="locations">
                <PageTitle pageTitle="Адреса"/>

                <div className="row button-row">
                    <div className="col-xs-12">
                        <button
                            onClick={this.showModal}
                            className="btn btn-primary pull-right btn-add">
                            <i className="fa fa-plus"></i>
                            <span>&nbsp;Добавить адрес</span>
                        </button>
                    </div>
                </div>

                {(list) ?
                    ((list.length === 0) ?
                        <div>Адреса ещё не добавлены</div> :
                        <div className="row location-list">
                            {list.map((item) =>
                                <div className="col-sm-12 col-md-6 col-lg-6"
                                     key={item._id}>
                                     <LocationPanel
                                        data={item}
                                        serviceList={services}
                                        onPaymentService={this.onPaymentService}
                                        onEdit={this.editLocation}
                                        onDelete={this.deleteLocation}
                                     />
                                </div>
                            )}
                        </div>)
                    :
                <div>Загрузка данных...</div>}

                {showModal &&
                <LocationModal
                    location={location}
                    save={this.onSaveData}
                    close={this.closeModal}
                />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(LocationActions, dispatch),
        serviceActions: bindActionCreators(ServiceActions, dispatch),
        paymentActions: bindActionCreators(PaymentActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations);