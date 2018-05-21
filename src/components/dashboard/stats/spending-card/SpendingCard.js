import React, {Component} from 'react';
import './SpendingCard.css';
import $ from 'jquery';

/**
 * Компонент отображения общей суммы расходов.
 */
export default class SpendingCard extends Component {
    componentDidMount() {
        this.renderAndAnimate(this.props.amount);
    }

    componentDidUpdate() {
        this.renderAndAnimate(this.props.amount);
    }

    renderAndAnimate(amount) {
        let element = $('#amount');

        if (element) {
            element.text(amount).prop('amount', 0).animate({amount: amount}, {
                duration: 1000,
                easing: 'swing',
                step: function(val) {
                    element.text(Number(val).toFixed(2));
                }
            });
        }
    }

    render() {
        return (<div className="col-sm-12 col-md-6 col-lg-6">
            <div className="panel panel-default panel-spend-card">
                <div className="panel-body">
                    <div className="spend-card-logo">
                        <i className="fa fa-rub" aria-hidden="true"></i>
                    </div>
                    <div className="spend-card-desc">
                        <span id="amount" className="amount"></span>
                        <span className="text">Общая сумма расходов</span>
                    </div>
                </div>
            </div>
        </div>)
    }
}