import { checkRequiredFields } from "../../../../../utils/CommonUtil";
import {BY_RATE} from "../../../../../constants/ServiceConst";

/**
 * Валидатор формы оплаты.
 */
const PaymentFormValidate = (values) => {
    let errors = {};

    let requiredFields = [
        'service',
        'paymentSum',
        'paymentDay',
        'period'
    ];

    if (values.typePayment === BY_RATE) {
        requiredFields.push('meterReading');

        if (Number(values.meterReading) <= Number(values.lastMeterReading)) {
            errors.meterReading = "Неверно указаны показания";
        }
    }

    errors = {...errors, ...checkRequiredFields(requiredFields, values)};

    const patternPeriod = /^[\d]{2}.[\d]{4}$/gi;

    if (!patternPeriod.test(values.period)) {
        errors.period = "Неверно указан период оплаты";
    }

    if (Number(values.paymentSum <= 0)) {
        errors.paymentSum = "Неверно указана сумма оплаты";
    }

    return errors;
}

export default PaymentFormValidate;