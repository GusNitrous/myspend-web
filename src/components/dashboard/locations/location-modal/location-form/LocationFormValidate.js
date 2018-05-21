import {isValidStrLength, checkRequiredFields} from "../../../../../utils/CommonUtil";

/**
 * Минимальная длина для наименования.
 */
const MIN_TITLE_LENGTH = 5;

/**
 * Валидатор формы добавления/редактирования адреса.
 */
const LocationFormValidate = (values) => {
    const requiredFields = ['title', 'description'];
    const errors = checkRequiredFields(requiredFields, values);

    if (values.title && !isValidStrLength(values.title, MIN_TITLE_LENGTH)) {
        errors.title = `Минимальная длина наименования ${MIN_TITLE_LENGTH} символов`;
    }

    return errors;
}

export default LocationFormValidate;