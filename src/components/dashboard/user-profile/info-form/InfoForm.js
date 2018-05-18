import React from "react";
import { Form, Field } from "react-final-form";
import FormValidate from "./InfoFormValidate";

const InfoForm = (props) => (
    <Form
        onSubmit={props.onSubmit}
        validate={FormValidate}
        initialValues={props.initValues}
        render={({ handleSubmit, valid, reset, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <Field name="email">
                        {({ input, meta }) => (
                            <div className={"form-group " + ((meta.error && meta.touched) && "has-error")}>
                                <label className="control-label" htmlFor="email">
                                    {meta.error && meta.touched ? meta.error : "Email"}
                                </label>
                                <input
                                    id="email"
                                    {...input}
                                    type="email"
                                    className="form-control"
                                />
                            </div>)}
                    </Field>

                    <div className="form-group">
                        <label htmlFor="name">
                            Имя
                        </label>
                        <Field
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            component="input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">
                            Фамилия
                        </label>
                        <Field
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-control"
                            component="input"
                        />
                    </div>
                </div>

                <div className="btn-group-form">
                    <button
                        type="button"
                        onClick={reset}
                        disabled={submitting || pristine}
                        className="btn btn-default">
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                        <span>&nbsp;Отмена</span>
                    </button>

                    <button
                        type="submit"
                        disabled={submitting || !valid}
                        className="btn btn-mint">
                        <i className="fa fa-check" aria-hidden="true"></i>
                        <span>&nbsp;Сохранить</span>
                    </button>
                </div>
            </form>
        )}
    />
);

export default InfoForm;