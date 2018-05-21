import React from 'react';
import "./PaymentList.css";
import moment from 'moment';

const PaymentList = ({ list }) => (
    <div className="panel panel-default">
        <table className="table table-striped table-payments">
            <thead>
            <tr>
                <th className="title">Услуга</th>
                <th className="tbl-col">Сумма</th>
                <th className="tbl-col">Показания</th>
                <th className="tbl-col">Период</th>
                <th className="tbl-col">Дата оплаты</th>
            </tr>
            </thead>
        </table>

        <div className="table-body-block">
            <table className="table table-striped table-hover table-payments">
                <tbody>
                {list.map((item) => (
                    <tr key={item._id}>
                        <td className="title">{ item.service.title }</td>
                        <td className="tbl-col">{ item.paymentSum }</td>
                        <td className="tbl-col">{ item.meterReading }</td>
                        <td className="tbl-col">{ item.period }</td>
                        <td className="tbl-col">
                            { moment.unix(item.paymentDay).format('DD-MM-YYYY') }
                        </td>
                    </tr>)
                )}
                </tbody>
            </table>
        </div>
    </div>
);

export default PaymentList;