import React from 'react';
import {browserHistory} from 'react-router';
import {FormGroup} from "../../../../shared/form-groups/FormGroups";
import {Field, Form} from "react-final-form";
import FormValidate from "./ServiceFormValidate";
import "./ServiceForm.css";
import {
    BY_RATE,
    CUBIC_METER,
    FIXED_PAYMENT,
    KILLO_WATT
} from "../../../../../constants/ServiceConst";
import {numberParse} from "../../../../../utils/CommonUtil";

/**
 * ServiceForm.
 */
const ServiceForm = ({ locations, handleSubmit, initValues }) => (
    <Form
        onSubmit={handleSubmit}
        validate={FormValidate}
        initialValues={initValues}
        render={({
            handleSubmit,
            valid,
            submitting,
            pristine,
            errors,
            touched,
            values
        }) => (
            <form id="serviceForm" className="form-horizontal" onSubmit={handleSubmit}>
                <div className="panel-title">Основная информация</div>
                <FormGroup>
                    <Field
                        id="title"
                        name="title"
                        className="form-control"
                        label="Наименование услуги*"
                        component="input"
                    />
                </FormGroup>

                <FormGroup>
                    <Field
                        name="clientAccount"
                        className="form-control"
                        label="Лицевой счёт*"
                        id="clientAccount"
                        component="input"
                    />
                </FormGroup>

                <FormGroup>
                    <Field
                        id="locationId"
                        name="locationId"
                        label="Адрес*"
                        className="form-control"
                        component="select">
                        <option />
                        {locations.map((addr) => (
                            <option
                                key={addr._id}
                                value={addr._id}>
                                {addr.title}
                            </option>
                        ))}
                    </Field>
                </FormGroup>

                <div className="panel-title">Детали платежа</div>

                <FormGroup>
                    <Field
                        id="typePayment"
                        name="typePayment"
                        label="Тип оплаты"
                        className="form-control"
                        component="select">
                        <option value={FIXED_PAYMENT}>Фиксированная</option>
                        <option value={BY_RATE}>По счётчику</option>
                    </Field>
                </FormGroup>

                {(values.typePayment === FIXED_PAYMENT) ?
                    <FormGroup>
                        <Field
                            id="userCharge"
                            name="userCharge"
                            className="form-control"
                            label="Абонентская плата*"
                            parse={(value) => numberParse(value, true)}
                            component="input"
                        />
                    </FormGroup>
                :
                    <div className="form-group-container">
                        <FormGroup>
                            <Field
                                id="measureUnit"
                                name="measureUnit"
                                label="Единицы измерения*"
                                className="form-control"
                                component="select">
                                <option value={CUBIC_METER}>М&sup3;</option>
                                <option value={KILLO_WATT}>кВт&middot;ч</option>
                            </Field>
                        </FormGroup>

                        <FormGroup>
                            <Field
                                id="rate"
                                name="rate"
                                className="form-control"
                                label="Тариф*"
                                parse={(val) => numberParse(val, true)}
                                component="input"
                            />
                        </FormGroup>
                    </div>
                }

                <button
                    type="button"
                    className="btn btn-primary btn-add pull-left"
                    onClick={() => browserHistory.push('/services')}>
                    <i className="fa fa-arrow-left"></i>
                    <span>&nbsp;Назад к услугам</span>
                </button>

                <button
                    disabled={!valid}
                    className="btn btn-mint pull-right">
                    <i className="fa fa-check"></i>
                    <span>&nbsp;Сохранить</span>
                </button>
            </form>
        )}
    />
);

export default ServiceForm;