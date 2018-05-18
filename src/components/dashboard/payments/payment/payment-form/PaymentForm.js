import React from 'react';
import {browserHistory} from 'react-router';
import {FormGroup} from "../../../../shared/form-groups/FormGroups";
import {Field, Form} from "react-final-form";
import FormValidate from "./PaymentFormValidate";
import 'flatpickr/dist/themes/airbnb.css';
import {Russian} from 'flatpickr/dist/l10n/ru.js';
import Flatpickr from 'react-flatpickr';
import createDecorator from 'final-form-calculate'
import {BY_RATE} from "../../../../../constants/ServiceConst";
import moment from 'moment';
import {getUnixTime, numberParse} from "../../../../../utils/CommonUtil";

/**
 * Форматирование поля для указания периода оплаты.
 */
function parsePeriod(value) {
    if (!value) {
        return value;
    }

    const nums = numberParse(value);

    if (nums.length <= 2) {
        return nums;
    }

    if (nums.length <= 6) {
        return `${nums.slice(0, 2)}.${nums.slice(2)}`;
    }

    return `${nums.slice(0, 2)}.${nums.slice(2, 6)}`;
}

/**
 * Вычисление суммы платежа.
 */
const calculatePaymentSum = createDecorator({
    field: 'meterReading',
    updates: {
        paymentSum: (meterValue, allValues) => {
            const result = Number(
                (meterValue - allValues.lastMeterReading) * allValues.rate).toFixed(2);

            return isNaN(result) ? 0 : result;
        }
    }
});

/**
 * PaymentForm.
 */
const PaymentForm = ({ initValues, handleSubmit }) => (
    <Form
        onSubmit={(values) => {
            const spending = (values.typePayment === BY_RATE) &&
                    (values.meterReading - values.lastMeterReading);

            values.spending = numberParse(spending);
            values.paymentDay = getUnixTime(moment(new Date(values.paymentDay)));

            handleSubmit(values);
        }}
        validate={FormValidate}
        initialValues={initValues}
        decorators={[calculatePaymentSum]}
        render={({
            handleSubmit,
            valid,
            submitting,
            pristine,
            errors,
            touched,
            values
        }) => (
            <form id="paymentForm" className="form-horizontal" onSubmit={handleSubmit}>
                <div className="panel-title">Основные реквизиты</div>

                <div className="form-group">
                    <label className="control-label custom-label col-xs-4">Услуга</label>
                    <div className="col-xs-8">
                        <p className="form-control-static">{values.title}</p>
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label custom-label col-xs-4">Лицевой счёт</label>
                    <div className="col-xs-8">
                        <p className="form-control-static">{values.clientAccount}</p>
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label custom-label col-xs-4">Адрес</label>
                    <div className="col-xs-8">
                        <p className="form-control-static">
                            {values.location}
                        </p>
                    </div>
                </div>

                <div className="panel-title">Детали платежа</div>

                {(values.typePayment === BY_RATE) &&
                <div className="form-group-container">
                    <div className="form-group">
                        <label className="control-label custom-label col-xs-4">
                            Тариф
                        </label>
                        <div className="col-xs-8">
                            <p className="form-control-static">
                                {values.rate}&nbsp;руб.
                            </p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label custom-label col-xs-4">
                            Предыдущие показания
                        </label>
                        <div className="col-xs-8">
                            <p className="form-control-static">
                                {values.lastMeterReading}
                            </p>
                        </div>
                    </div>

                    <FormGroup>
                        <Field
                            id="meterReading"
                            name="meterReading"
                            className="form-control"
                            label="Текущие показания*"
                            parse={(value) => numberParse(value)}
                            component="input"
                        />
                    </FormGroup>
                </div>}

                <div className="form-group">
                    <label
                        className="control-label custom-label col-xs-4"
                        htmlFor="paymentDay">
                        Дата оплаты
                    </label>
                    <Field
                        name="paymentDay">
                        {() => (
                            <div className="col-xs-8">
                                <Flatpickr
                                    value={values.paymentDay}
                                    onChange={(dates) => {
                                        values.paymentDay = dates;
                                    }}
                                    id={"paymentDay"}
                                    className={"form-control"}
                                    options={{
                                        dateFormat: 'd-m-Y',
                                        locale: Russian
                                    }}
                                />
                            </div>
                        )}
                    </Field>
                </div>

                <FormGroup>
                    <Field
                        id="period"
                        name="period"
                        className="form-control"
                        label="Период*"
                        parse={parsePeriod}
                        placeholder="ММ.ГГГГ"
                        component="input"
                    />
                </FormGroup>

                <FormGroup>
                    <Field
                        id="paymentSum"
                        name="paymentSum"
                        className="form-control"
                        label="Сумма платежа*"
                        parse={(value) => numberParse(value, true)}
                        component="input"
                    />
                </FormGroup>

                <div className="btn-group btn-group-justified">
                    <div className="btn-group">
                        <button
                            type="reset"
                            className="btn btn-default"
                            onClick={() => browserHistory.push('/services')}>
                            <i className="fa fa-ban"></i>
                            <span>&nbsp;Отмена</span>
                        </button>
                    </div>

                    <div className="btn-group">
                        <button
                            disabled={!valid || submitting}
                            className="btn btn-mint">
                            <i className="fa fa-check"></i>
                            <span>&nbsp;Зафиксировать</span>
                        </button>
                    </div>
                </div>
            </form>
        )}
    />
);

export default PaymentForm;