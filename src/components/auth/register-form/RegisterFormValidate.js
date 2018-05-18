import {
    checkRequiredFields,
    isEmail,
    isValidStrLength,
    validateUserEmail
} from "../../../utils/CommonUtil";

/**
 * Минимальная длина пароля.
 */
const MIN_PASSWORD_LENGTH = 5;

/**
 * Валидатор формы регистрации.
 */
const RegisterFormValidate = (values) => {
    const requiredFields = ['email', 'password', 'retryPassword'];
    const errors = checkRequiredFields(requiredFields, values);

    if (!errors.email && !isEmail(values.email)) {
        errors.email = "Некорректный email адрес";
    }

    if (!errors.password && !isValidStrLength(values.password, MIN_PASSWORD_LENGTH)) {
        errors.password = `Минимальная длина пароля ${MIN_PASSWORD_LENGTH} символов`;
    }

    if (!errors.retryPassword && values.password !== values.retryPassword) {
        errors.retryPassword = "Пароли не совпадают";
    }

    return Object.keys(errors).length ? errors : validateUserEmail(values.email);
}

export default RegisterFormValidate;