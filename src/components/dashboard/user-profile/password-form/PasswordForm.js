import React from "react";
import { Form, Field } from "react-final-form";
import FormValidate from "./PasswordFormValidate";

const PasswordForm = (props) => (
    <Form
        onSubmit={props.onSubmit}
        validate={FormValidate}
        render={({ handleSubmit, valid, submitting }) => (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <Field name="oldPassword">
                        {({ input, meta }) => (
                            <div className={"form-group " + ((meta.error && meta.touched) && "has-error")}>
                                <label className="control-label" htmlFor="oldPassword">
                                    {meta.error && meta.touched ? meta.error : "Старый пароль"}
                                </label>
                                <input
                                    id="oldPassword"
                                    {...input}
                                    type="password"
                                    className="form-control"
                                />
                            </div>)}
                    </Field>

                    <Field name="newPassword">
                        {({ input, meta }) => (
                            <div className={"form-group " + ((meta.error && meta.touched) && "has-error")}>
                                <label className="control-label" htmlFor="newPassword">
                                    {meta.error && meta.touched ? meta.error : "Новый пароль"}
                                </label>
                                <input
                                    id="newPassword"
                                    {...input}
                                    type="password"
                                    className="form-control"
                                />
                            </div>)}
                    </Field>

                    <Field name="retryPassword">
                        {({ input, meta }) => (
                            <div className={"form-group " + ((meta.error && meta.touched) && "has-error")}>
                                <label className="control-label" htmlFor="retryPassword">
                                    {meta.error && meta.touched ? meta.error : "Повторите пароль"}
                                </label>
                                <input
                                    id="retryPassword"
                                    {...input}
                                    type="password"
                                    className="form-control"
                                />
                            </div>)}
                    </Field>
                </div>

                <button
                    disabled={submitting || !valid}
                    className="btn btn-mint pull-right">
                    <i className="fa fa-check"></i>
                    <span>&nbsp;Сохранить</span>
                </button>
            </form>
        )}
    />
);

export default PasswordForm;