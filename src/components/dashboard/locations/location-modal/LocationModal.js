import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LocationForm from "./location-form/LocationForm";
import './LocationModal.css';

/**
 * Модальное окно добавления/редактирования адреса.
 */
export default class LocationModal extends PureComponent {
    close = () => {
        this.props.close();
    }

    save = (values) => {
        // адрес
        const location = this.props.location;

        if (location && location._id) {
            values.id = location._id;
        }

        this.props.save(values);
    }

    render() {
        const location = this.props.location;

        return (
            <div className="location-modal">
                <div className="modal-dialog modal-xs">
                    <div className="modal-content">
                        <div className="modal-header header-dark header-custom">
                            <button type="button" className="custom-close-modal" onClick={this.close}>
                                <i className="fa fa-times-circle" aria-hidden="true"></i>
                            </button>
                            <h3 className="text-center modal-title">
                                {location ? "Редактировать адрес" : "Добавить адрес"}
                            </h3>
                        </div>
                        <LocationForm
                            onClose={this.close}
                            onSubmit={this.save}
                            initValues={location}
                        />
                    </div>
                </div>
                <div className="overlay" onClick={this.close}></div>
            </div>
        );
    }
}

LocationModal.propTypes = {
    close: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired
}