import React, { Component } from 'react';
import LocationControl from "../location-control/LocationControl";
import LocationServices from "../location-services/LocationServices";
import './LocationPanel.css';

/**
 * Панель адреса.
 */
export default class LocationPanel extends Component {
    onEdit = () => {
        this.props.onEdit(this.props.data);
    }

    onRemove = () => {
        this.props.onDelete(this.props.data);
    }

    render() {
        const { serviceList, data } = this.props;
        const services = serviceList.filter(item => item.locationId === data._id);

        return (
            <div className="panel panel-default panel-location">
                <div className="location-desc text-center">
                    <div className="logo-box">
                        <i className="fa fa-home location-logo" aria-hidden="true"></i>
                    </div>
                    <h1 className="location-title">{ data.title }</h1>
                    <p>{ data.description }</p>
                </div>

                <div className="panel-body">
                    <LocationControl
                        onEdit={this.onEdit}
                        onRemove={this.onRemove}
                    />
                </div>

                <LocationServices
                    onPayment={this.props.onPaymentService}
                    list={services}
                />
            </div>
        );
    }
}