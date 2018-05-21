import {isValidStrLength, checkRequiredFields} from "../../../../utils/CommonUtil";

/**
 * Минимальная длина пароля.
 */
const MIN_PASSWORD_LENGTH = 5;

/**
 * Валидатор формы изменения пароля пользователя.
 */
const PasswordFormValidate = (values) => {
    const requiredFields = ['oldPassword', 'newPassword', 'retryPassword'];
    const errors = checkRequiredFields(requiredFields, values);

    if (!errors.newPassword && !isValidStrLength(values.newPassword, MIN_PASSWORD_LENGTH)) {
        errors.newPassword = `Минимальная длина пароля ${MIN_PASSWORD_LENGTH} символов`;
    }

    if (!errors.retryPassword && values.newPassword !== values.retryPassword) {
        errors.retryPassword = `Пароли не совпадают`;
    }

    return errors;
}

export default PasswordFormValidate;