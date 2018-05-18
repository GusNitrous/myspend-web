import React from 'react';
import "./ServiceList.css";

const ServiceList = ({ list, onRemove, onEdit, onPayment }) => (
    <div className="panel panel-default">
        <ul className="list-group">
            { list.map((service) => (
                    <li key={service._id} className="list-group-item service-item">
                        <div className="row">
                            <div className="col-sm-6 col-md-8 col-lg-9">
                                <div className="service-title">{service.title}</div>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-3">
                                <div className="btn-group pull-right">
                                    <button
                                        title="Удалить"
                                        onClick={() => {
                                            onRemove(service);
                                        }}
                                        className="btn btn-default">
                                        <i className="fa fa-trash-o"></i>
                                    </button>

                                    <button
                                        title="Редактировать"
                                        onClick={() => {
                                            onEdit(service);
                                        }}
                                        className="btn btn-default">
                                        <i className="fa fa-pencil-square-o"></i>
                                    </button>

                                    <button
                                        title="Оплатить"
                                        onClick={() => {
                                            onPayment(service);
                                        }}
                                        className="btn btn-default">
                                        <i className="fa fa-arrow-circle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
);

export default ServiceList;