import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from '../components/Header';
import Form from '../components/Form';
import InfoCard from '../components/InfoCard';
import Chart from '../components/Chart';
import MarqueeComponent from '../components/MarqueeComponent';
import Loader from 'react-loader-spinner';

import styled from 'styled-components';

const LoaderWrapper = styled.div`
    display:flex;
    width:100%;
    height:100%;
    justify-content: center;
    align-items: center;
`;

const ErroMessage = styled.p`
    display:flex;
    width:100%;
    height:100%;
    justify-content: center;
    align-items: center;
    color:red;
`;

class Home extends Component {
    render() {
        console.log(this.props.status );
        return (
            <section>
                <Header title="Stock Price"></Header>
                <MarqueeComponent/>
                <Form/>
                {this.props.loading && <LoaderWrapper>
                        <Loader 
                            type="Oval"
                            color="#4A00E0"
                            height="100"	
                            width="100"
                        /> 
                    </LoaderWrapper>
                }
                {this.props.status === 'ERROR' &&<ErroMessage>
                {this.props.msg}
                </ErroMessage>
                }
                {this.props.companyData.length !== 0 && <InfoCard
                        companyName={"Company: " + this.props.companyData.companyName}
                        symbol={"Symbol: " + this.props.companyData.symbol}
                        exchange={"Exchange: " + this.props.companyData.exchange} 
                        price={"Price: $" + this.props.stockPrice}
                    />}
                <Chart/>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        stockPrice: state.quoteReducer.stockPrice,
        symbol: state.quoteReducer.symbol,
        companyData: state.companyReducer.companyData,
        chartData: state.chartReducer.chartData,
        status: state.statusReducer.status,
        loading: state.statusReducer.loading,
        msg: state.statusReducer.msg
    }   
}

export default withRouter(connect(mapStateToProps)(Home));