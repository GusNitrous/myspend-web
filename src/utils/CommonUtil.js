import SessionService from "../services/SessionService";
import HttpService from "../services/HttpService";
import {SHOW_NOTIFY} from '../actions/types/NotificationTypes';
import qs from "qs";

/**
 * Различные вспомогательные утилиты.
 */

const session = SessionService.getInstance();
const http = HttpService.getInstance();

/**
 * Парсер числовых значений.
 * @param value
 * @param isFloat
 */
export function numberParse(value, isFloat = false) {
    const patern = isFloat ? /([-a-zA-Zа-яА-Я,&\\|/ёЁ`'"_~[\]{}*^%$#№!=+()?><;])|([.]{2})/g : /[^\d]/g;
    return !value || isNaN(value) ? '' : String(value).replace(patern, '');
}

/**
 * Проверка уникальности email пользователя.
 */
export function validateUserEmail(email) {
    const authData = session.getAuthData();
    const errors = {};

    return (authData && email === authData.email) ? errors : new Promise((resolve) => {
        http.post('/user/checkEmail', qs.stringify({email: email})).then((res) => {
            if (res) errors.email = 'Такой email уже существует';
            resolve(errors);
        }).catch((err) => {
            console.warn(err);
        });
    });
}

/**
 * Проверяет переданный email на соответствие.
 */
export function isEmail(email) {
    const emailPattern = /^[A-Z0-9._+-]{3,}@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
    return emailPattern.test(email);
}

/**
 * Проверяет минимальную длину для переданной строки.
 */
export function isValidStrLength(str, minLength) {
    return str && str.length >= minLength;
}

/**
 * Проверка обязательных полей.
 */
export function checkRequiredFields(fields, values, msg = '') {
    const errors = {};
    
    if (!msg) {
        msg = "Обязательно для заполнения";
    }

    fields.forEach((field) => {
        if (!values[field]) {
            errors[field] = msg;
        }
    });

    return errors;
}

/**
 * Конвертирует переданный объект времени в unix timestamp.
 */
export function getUnixTime(obj) {
    return obj.hours(0).minutes(0).seconds(0).milliseconds(0).unix();
}

/**
 * Вызывает событие показа оповещения (для использования в экшенах).
 */
export function showNotify(dispatch, text, msgType) {
    dispatch({
        type: SHOW_NOTIFY,
        payload: {
            text: text || "Fatal error",
            type: msgType
        }
    });
}