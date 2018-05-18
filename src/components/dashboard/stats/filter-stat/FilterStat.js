import React from 'react';
import Flatpickr from 'react-flatpickr';
import {Field, Form} from "react-final-form";
import {Russian} from "flatpickr/dist/l10n/ru";
import moment from 'moment';
import {getUnixTime} from "../../../../utils/CommonUtil";
import './FilterStat.css';

// Значения по умолчанию для дат.
const INIT_DATES = {
    from: moment().subtract(1, 'month').toDate(),
    to: moment().hours(0).toDate()
}

const FilterStat = ({ handleSubmit }) => (
    <div className="row">
    <div className="col-xs-12">
        <div className="panel panel-default panel-filter">
            <div className="panel-body">
                <Form
                    onSubmit={(values) => {
                        const dateFrom = getUnixTime(moment(new Date(values.from)));
                        const dateTo = getUnixTime(moment(new Date(values.to)));

                        handleSubmit(dateFrom, dateTo);
                    }}
                    initialValues={INIT_DATES}
                    render={({values, handleSubmit, submitting}) =>
                        (<form className="filter-chart-form"
                               onSubmit={handleSubmit}>
                            <div className="form-group col-sm-12 col-md-5 col-lg-5">
                                <div className="input-group">
                                    <span className="input-group-addon" id="from">from:</span>
                                    <Field name="from">
                                        {() => (
                                            <Flatpickr
                                                value={values.from}
                                                onChange={(dates) => {
                                                    values.from = dates;
                                                }}
                                                className={"form-control"}
                                                options={{
                                                    dateFormat: 'd-m-Y',
                                                    locale: Russian
                                                }}
                                            />
                                        )}
                                    </Field>
                                </div>
                            </div>

                            <div className="form-group col-sm-12 col-md-5 col-lg-5">
                                <div className="input-group">
                                    <span className="input-group-addon" id="to">to:</span>
                                    <Field name="to">
                                        {() => (
                                            <Flatpickr
                                                value={values.to}
                                                onChange={(dates) => {
                                                    values.to = dates;
                                                }}
                                                className={"form-control"}
                                                options={{
                                                    dateFormat: 'd-m-Y',
                                                    locale: Russian
                                                }}
                                            />
                                        )}
                                    </Field>
                                </div>
                            </div>

                            <div className="form-group col-sm-12 col-md-2 col-lg-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary pull-right"
                                    disabled={submitting}>
                                    Загрузить
                                </button>
                            </div>
                        </form>)
                    }
                />
            </div>
        </div>
    </div>
</div>)

export default FilterStat;