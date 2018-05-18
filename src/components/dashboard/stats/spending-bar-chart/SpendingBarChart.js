import React, {Component} from 'react';
import {BACKGROUND_COLORS, HOVER_BACKGROUND_COLORS} from '../../../../constants/DiagramConst';
import {BY_RATE, CUBIC_METER} from "../../../../constants/ServiceConst";
import Chart from 'chart.js';

/**
 * Компонент bar диаграммы расходов потребления.
 */
export default class SpendingBarChart extends Component {
    componentDidMount() {
        this.prepareAndRenderChart(this.props.chartData);
    }

    componentDidUpdate() {
        if (this.barChart) {
            this.barChart.destroy();
        }

        this.prepareAndRenderChart(this.props.chartData);
    }

    prepareAndRenderChart({ byServices }) {
        const barChartData = this.prepareChartData(byServices);
        this.renderChart(barChartData);
    }

    prepareChartData(dataList) {
        const data = [];
        const labels = [];

        dataList.forEach((item) => {
            let service = item.services[0];

            if (service && service.typePayment === BY_RATE) {
                data.push(Number(item.spendingSum).toFixed(2));

                let label = service.title +
                        (service.measureUnit === CUBIC_METER ? ' (м3)' : ' (Кв.ч)');

                labels.push(label);
            }
        });

        return {
            labels: labels,
            datasets: [{
                label: "Показатели потребления",
                data: data,
                backgroundColor: BACKGROUND_COLORS,
                hoverBackgroundColor: HOVER_BACKGROUND_COLORS
            }]
        };
    }

    renderChart(data) {
        if (this.barCanvas) {
            const options = {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 30
                    }
                }
            };

            this.barChart = new Chart(this.barCanvas, {
                type: 'bar',
                data: data,
                options: options
            });
        }
    }

    componentWillUnmount() {
        this.barCanvas = null;

        if (this.barChart) {
            this.barChart.destroy();
        }
    }

    getBarCanvas = (element) => {
        this.barCanvas = element;
    }

    render() {
        const { chartData } = this.props;
        const showChart = chartData && chartData.byServices.length > 0;

        return (<div className="col-xs-12">
            <div className="panel panel-default panel-chart">
                <div className="panel-body">
                    {showChart ?
                    <canvas ref={this.getBarCanvas}></canvas> :
                    <div className="chart-placeholder bar-chart">
                        Данные по расходам отсутствуют
                    </div>}
                </div>
            </div>
        </div>)
    }
}