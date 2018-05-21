import React from 'react';
import './LocationServices.css';

/**
 * Список услуг, прикреплённых к адресу.
 */
const LocationServices = ({ list, onPayment }) => {
    return (
        <div className="service-list">
            { list.length === 0 ?
                <div className="placeholder-service text-center">
                    Услуги ещё не добавлены к этому адресу
                </div> :
                <ul className="list-group">
                { list.map((service) => (
                    <li key={service._id} className="list-group-item">
                        <div className="row">
                            <div className="col-xs-10 service-row-title">
                                {service.title}
                            </div>
                            <div className="col-xs-2">
                                <button
                                    title="Оплатить"
                                    className="btn btn-default pull-right"
                                    onClick={() => {
                                        onPayment(service);
                                    }}>
                                    <i className="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
                </ul>
            }
        </div>
    );
}

export default LocationServices;