import {checkRequiredFields, isEmail, validateUserEmail} from "../../../../utils/CommonUtil";

/**
 * Валидатор формы редактирования данных пользователя.
 */
const InfoFormValidate = (values) => {
    const requiredFields = ['email'];
    const errors = checkRequiredFields(requiredFields, values);

    if (!errors.email && !isEmail(values.email)) {
        errors.email = "Неверный формат email";
    }

    return Object.keys(errors).length ? errors : validateUserEmail(values.email);
}

export default InfoFormValidate;