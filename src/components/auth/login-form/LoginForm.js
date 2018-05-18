import React from "react";
import { Form, Field } from "react-final-form";
import FormValidate from "./LoginFormValidate";
import {InputGroup} from "../../shared/form-groups/FormGroups";

const LoginForm = (props) => (
    <Form
        onSubmit={props.onSubmit}
        validate={FormValidate}
        render={({ handleSubmit, valid, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
                <Field
                    name="email"
                    type="text"
                    label="Email"
                    component={InputGroup}
                />

                <Field
                    name="password"
                    type="password"
                    label="Пароль"
                    component={InputGroup}
                />

                <div className="btn-group-justified">
                    <div className="btn-group">
                        <button
                            className="btn btn-mint"
                            disabled={!valid || submitting}>
                            Войти
                        </button>
                    </div>
                </div>
            </form>
        )}
    />
);

export default LoginForm;