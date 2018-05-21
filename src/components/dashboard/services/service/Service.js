import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ServiceActions from '../../../../actions/Services';
import PageTitle from "../../../shared/page-title/PageTitle";
import ServiceForm from './service-form/ServiceForm';
import {CUBIC_METER, FIXED_PAYMENT} from "../../../../constants/ServiceConst";

/**
 * Service.
 */
class Service extends Component {
    /**
     * @inheritDoc
     */
    componentDidMount() {
        const route = this.props.route;
        const service = this.props.services.service;

        if (route.path === 'edit' && !service) {
            browserHistory.push('/services');
        }
    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
        // сброс редактируемого объекта
        this.props.actions.editService(null);
    }

    /**
     * Обработчик сохранения данных.
     */
    handleSubmit = (data) => {
        this.props.actions.saveService(data);
    }

    render() {
        const locationList = this.props.locations.list;
        const route = this.props.route;

        let pageTitle = 'Добавление услуги';

        let initValues = {
            measureUnit: CUBIC_METER,
            typePayment: FIXED_PAYMENT
        };

        // при редактировании услуги
        if (route.path === 'edit') {
            // редактируемый объект услуги
            const service = this.props.services.service;

            if (service) {
                pageTitle = 'Редактирование услуги | ' + service.title;
                initValues = service;
            }
        }

        return (
            <div className="service-form">
                <PageTitle pageTitle={pageTitle} />

                <div className="row form-row">
                    <div className="col-sm-12 col-md-10 col-lg-10">
                        <div className="panel panel-default panel-service-form">
                            <div className="panel-body">
                                <ServiceForm
                                    handleSubmit={this.handleSubmit}
                                    locations={locationList}
                                    initValues={initValues}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ServiceActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Service);