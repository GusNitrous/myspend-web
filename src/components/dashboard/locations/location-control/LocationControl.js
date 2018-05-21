import React from 'react';
import './LocationControl.css';

/**
 * Элементы управления адресом.
 */
const LocationControl = ({onEdit, onRemove}) => {
    return (
        <div className="btn-container">
            <div className="btn-group btn-group-justified">
                <div className="btn-group btn-group-sm">
                    <button
                        className="btn btn-primary"
                        onClick={onEdit}
                        title="Редактировать адрес">
                        <i className="fa fa-pencil-square"></i>
                    </button>
                </div>
                <div className="btn-group btn-group-sm">
                    <button
                        className="btn btn-danger"
                        onClick={onRemove}
                        title="Удалить адрес">
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LocationControl;