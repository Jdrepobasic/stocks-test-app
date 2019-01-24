import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from '../components/Header';
import Form from '../components/Form';
import InfoCard from '../components/InfoCard';
import Chart from '../components/Chart';

class Home extends Component {
    render() {
        return (
            <section>
                <Header title="Stock Price"></Header>
                <Form/>
                {this.props.companyData.length !== 0 && <InfoCard
                        companyName={"Company: " + this.props.companyData.companyName}
                        symbol={"Symbol: " + this.props.companyData.symbol}
                        exchange={"Exchange: " + this.props.companyData.primaryExchange} 
                        price={"Price: $" + this.props.stockPrice}
                    />}
                <Chart></Chart>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        stockPrice: state.quoteReducer.stockPrice,
        symbol: state.quoteReducer.symbol,
        companyData: state.companyReducer.companyData,
        chartData: state.chartReducer.chartData

    }   
}

export default withRouter(connect(mapStateToProps)(Home));