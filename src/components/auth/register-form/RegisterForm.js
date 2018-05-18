import React from "react";
import {Field, Form} from "react-final-form";
import FormValidate from './RegisterFormValidate';
import {InputGroup} from "../../shared/form-groups/FormGroups";

/**
 * Компонент формы регистрации.
 */
const RegisterForm = (props) => (
    <Form
        onSubmit={props.onSubmit}
        validate={FormValidate}
        render={({ handleSubmit, valid, submitting }) => (
            <form onSubmit={ handleSubmit }>
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

                <Field
                    name="retryPassword"
                    type="password"
                    label="Повторите пароль"
                    component={InputGroup}
                />

                <div className="btn-group-justified">
                    <div className="btn-group">
                        <button
                            className="btn btn-mint"
                            disabled={ !valid || submitting }>
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            </form>
        )}
    />
);

export default RegisterForm;