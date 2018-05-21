import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as StatActions from '../../../actions/Stats';
import {bindActionCreators} from 'redux';
import PageTitle from "../../shared/page-title/PageTitle";
import SpendingBarChart from "./spending-bar-chart/SpendingBarChart";
import ServicesPieChart from "./services-pie-chart/ServicesPieChart";
import SpendingCard from "./spending-card/SpendingCard";
import FilterStat from "./filter-stat/FilterStat";

class Stats extends Component {
    componentDidMount() {
        this.props.actions.loadStat();
    }

    getStats = (from, to) => {
        this.props.actions.loadStat(from, to);
    }

    render() {
        const { data } = this.props;
        const totalSum = data ? data.totalSum : 0;

        return (
            <div className="home-page">
                <PageTitle pageTitle="Статистика платежей"/>
                <FilterStat handleSubmit={this.getStats}/>

                {(data) ?
                    (<div>
                        <div className="row">
                            <SpendingCard amount={totalSum}/>
                            <ServicesPieChart chartData={data}/>
                        </div>

                        <div className="row">
                            <SpendingBarChart chartData={data}/>
                        </div>
                    </div>)
                :
                    <div className="row">
                        <div className="col-xs-12">
                            Загрузка данных...
                        </div>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.stats;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(StatActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);