import {checkRequiredFields, isEmail} from "../../../utils/CommonUtil";

/**
 * Валидатор формы авторизации.
 */
const LoginFormValidate = (values) => {
    const requiredFields = ['email', 'password'];
    const errors = checkRequiredFields(requiredFields, values);

    if (!errors.email && !isEmail(values.email)) {
        errors.email = "Некорректный email адрес";
    }

    return errors;
}

export default LoginFormValidate;