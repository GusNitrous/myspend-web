import React, {Component} from 'react';
import {BACKGROUND_COLORS, HOVER_BACKGROUND_COLORS} from '../../../../constants/DiagramConst';
import Chart from 'chart.js';

/**
 * Компонент pie диаграммы расходов по услугам.
 */
export default class ServicesPieChart extends Component {
    componentDidMount() {
        this.prepareAndRenderChart(this.props.chartData);
    }

    componentDidUpdate() {
        if (this.pieChart) {
            this.pieChart.destroy();
        }

        this.prepareAndRenderChart(this.props.chartData);
    }

    prepareAndRenderChart({ byServices }) {
        const pieChartData = this.prepareChartData(byServices);
        this.renderChart(pieChartData);
    }

    prepareChartData(dataList) {
        const data = [];
        const labels = [];

        dataList.forEach((item) => {
            let service = item.services[0];

            data.push(Number(item.total).toFixed(2));
            labels.push(service.title);
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
        if (this.pieCanvas) {
            const options = {
                legend: {
                    display: true,
                    position: 'left',
                    labels: {
                        boxWidth: 20
                    }
                }
            };

            this.pieChart = new Chart(this.pieCanvas, {
                type: 'doughnut',
                data: data,
                options: options
            });
        }
    }

    componentWillUnmount() {
        this.pieCanvas = null;

        if (this.pieChart) {
            this.pieChart.destroy();
        }
    }

    getPieCanvas = (element) => {
        this.pieCanvas = element;
    }

    render() {
        const { chartData } = this.props;
        const showChart = chartData && chartData.byServices.length > 0;

        return (<div className="col-sm-12 col-md-6 col-lg-6">
            <div className="panel panel-default panel-chart">
                <div className="panel-body">
                    {showChart ?
                    <canvas ref={this.getPieCanvas}></canvas> :
                    <div className="chart-placeholder">
                        Данные по услугам отсутствуют
                    </div>}
                </div>
            </div>
        </div>)
    }
}