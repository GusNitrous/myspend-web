import React from "react";
import { Form, Field } from "react-final-form";
import FormValidate from "./LocationFormValidate";
import {InputGroup} from "../../../../shared/form-groups/FormGroups";

const LocationForm = (props) => (
    <Form
        onSubmit={props.onSubmit}
        validate={FormValidate}
        initialValues={props.initValues}
        render={({ handleSubmit, valid, submitting }) => (
            <form className="form" onSubmit={handleSubmit}>
                <div className="modal-body">
                    <Field
                        name="title"
                        type="text"
                        label="Наименование"
                        component={InputGroup}
                    />

                    <Field
                        name="description"
                        type="text"
                        label="Описание"
                        component={InputGroup}
                    />
                </div>
                <div className="modal-footer">
                    <button
                        className="btn btn-default"
                        type="reset"
                        disabled={submitting}
                        onClick={props.onClose}>
                        Отмена
                    </button>
                    <button
                        className="btn btn-mint"
                        disabled={!valid || submitting}>
                        Сохранить
                    </button>
                </div>
            </form>
        )}
    />
);

export default LocationForm;