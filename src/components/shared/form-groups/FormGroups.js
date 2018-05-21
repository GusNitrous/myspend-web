import React from 'react';
import {Field} from "react-final-form";

const InputGroup = ({input, meta, type, label}) => {
    return (<div className={"form-group " + (meta.error && meta.touched ? "has-error" : "")}>
        {meta.error && meta.touched && <label className="control-label">{meta.error}</label>}
        <input {...input}
               type={type}
               className="form-control"
               placeholder={label}/>
    </div>);
}

const FormGroup = ({ children, vertical }) => (
    <Field
        name={children.props.name}
        subscription={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) => (
            <div className={"form-group " + (touched && error ? "has-error" : "")}>
                <label
                    htmlFor={children.props.id}
                    className={"control-label custom-label" + (!vertical ? " col-xs-4" : "")}>
                    {children.props.label}
                </label>
                {!vertical ? <div className="col-xs-8">{children}</div> : {children}}
            </div>
        )}
    />
);

FormGroup.defaultProps = {
    vertical: false
}

const InputLabelGroup = ({input, meta, type, id, label, labelClass, horizontal}) => {
        const inputElement = <input id={id} className="form-control" {...input} type={type} />

        return (
            <div className={"form-group " + (meta.error && meta.touched ? "has-error" : "")}>
                <label className={"control-label " + labelClass}
                       htmlFor={id}>
                       {label}
                </label>

                {horizontal ? <div className="col-xs-8">{inputElement}</div> : inputElement}
            </div>
        );
}

InputLabelGroup.defaultProps = {
    type: "text",
    labelClass: "col-xs-4",
    horizontal: true
}

const SelectGroup = ({input, meta, id, label, ...rest}) => {
    const {options, labelClass, horizontal} = rest;

    const selectElement = (<select {...input} id={id} className="form-control">
        <option />
            {options && options.map((opt, index) => (
                <option key={index} value={opt.value}>{opt.label}</option>))}
        </select>
    );

    return (
        <div className={"form-group " + (meta.error && meta.touched ? "has-error" : "")}>
            <label
                className={"control-label " + labelClass}
                htmlFor={id}>
                {label}
            </label>

            {horizontal ? <div className="col-xs-8">{selectElement}</div> : selectElement}
        </div>
    );
}

SelectGroup.defaultProps = {
    labelClass: "col-xs-4",
    horizontal: true
}

export {FormGroup, InputLabelGroup, InputGroup, SelectGroup};