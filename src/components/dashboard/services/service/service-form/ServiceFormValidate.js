import { checkRequiredFields } from "../../../../../utils/CommonUtil";
import {BY_RATE, FIXED_PAYMENT} from "../../../../../constants/ServiceConst";

/**
 * Валидатор формы добавления/редактирования сервиса.
 * @param values
 * @returns {{}}
 */
const ServiceFormValidate = (values) => {
    /*let bankInfoFields = [
        'bankTitle', 
        'region',
        'korAccount',
        'inn',
        'account',
        'bik'
    ];*/

    let requiredFields = [
        'clientAccount',
        'locationId',
        'title'
    ];

    if (values.typePayment === BY_RATE) {
        requiredFields.push('rate');
    } else if (values.typePayment === FIXED_PAYMENT) {
        requiredFields.push('userCharge');
    }

    /*if (!values.skipBankInfo) {
        requiredFields = [...requiredFields, ...bankInfoFields];
    }*/

    return checkRequiredFields(requiredFields, values);
}

export default ServiceFormValidate;