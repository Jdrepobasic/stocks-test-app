import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import styled from 'styled-components';
import BasicButton from './BasicButton';

import axios from 'axios';

import { getPrice, passSymbol } from '../actions/QuoteActions';
import { getCompanyInfo } from '../actions/CompanyAction';
import { getChartInfo } from '../actions/ChartActions';
import { getMultipleSymbols, getMultipleSymbolsData } from '../actions/MarqueeActions';
import { errorOccurred, startRequest, completeRequest } from '../actions/StatusActions';

// create styled elements
const FormWrapperStyled = styled.div`
    display:flex;
    width:100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

const FormCompStyled = styled.form`
    width:100%;
    max-width:500px;
    height:200px;
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const LabelStyled = styled.label`    
    font-weight:bold;
    font-size:22px;
`;
const InputStyled = styled.input`
    width:100%;
    max-width:500px;
    height:20px;
    font-size:16px;
    background-color:#eeeeee;
`;

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // altera o state de acordo com o que é coloca no input pelo usuario
    handleChange(event) {
        this.setState({value: event.target.value}); 
    }
    // ajusta os dados para o componente marquee
    handleDataMarquee(data){
        var dataSymbol = [];
        var dataPercents = [];
        data.forEach(element => {
            var percentChange = (element.quote.changePercent * 100).toFixed(3);
            dataPercents.push(percentChange);
            dataSymbol.push(element.quote.symbol);
        });
        this.props.getMultipleSymbolsData(dataSymbol, dataPercents);
    }
    // faz todas as requisições necessarias de acordo com o envio do formulurio com o simbolo.
    handleSubmit(event){
        this.props.startRequest();
        event.preventDefault();
        this.props.passSymbol(this.state.value);
        this.props.getMultipleSymbols(this.state.value);
        setTimeout(() => {
            //fazendo requisições
            var intervalRequest = setInterval(() => {
                axios.all([
                    axios.get(`https://api.iextrading.com/1.0/stock/${this.props.symbol}/quote`),
                    axios.get(`https://api.iextrading.com/1.0/stock/${this.props.symbol}/company`),
                    axios.get(`https://api.iextrading.com/1.0/stock/${this.props.symbol}/chart/1m?chartLast=30`),
                    axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.props.multipleSymbolsReq}&types=quote`)
                ])
                .then(axios.spread((resQuote, resCompany, resChart,resMarq) => {
                    // chamanod funcoes necesserias para atualizar estados do redux
                    this.props.getPrice(resQuote.data.latestPrice);
                    this.props.getCompanyInfo(resCompany.data);
                    this.props.getChartInfo(resChart.data); 
                    this.handleDataMarquee(Object.values(resMarq.data));
                    this.props.completeRequest();
                    
                })).catch((error) => {
                    // tratando error
                    clearInterval(intervalRequest);
                    this.props.errorOccurred();
                });   
            }, 2000);
        }, 100);
    }
    render() { 
    
        return (
            <FormWrapperStyled>
                <FormCompStyled onSubmit={this.handleSubmit}>
                    <LabelStyled>SYMBOL( e.g: aapl for apple ):</LabelStyled>
                    <InputStyled type="text" value={this.state.value} onChange={this.handleChange} required></InputStyled>
                    <BasicButton type="submit" text="Make request"></BasicButton>
                </FormCompStyled>
            </FormWrapperStyled>
        );
    }   
}

const mapStateToProps = (state) => {
    return{
        stockPrice: state.quoteReducer.stockPrice,
        symbol: state.quoteReducer.symbol,
        companyData: state.companyReducer.companyData,
        chartData: state.chartReducer.chartData,
        multipleSymbolsReq: state.marqueeReducer.multipleSymbolsReq,
        symbolNames: state.marqueeReducer.symbolNames,
        percentValues: state.marqueeReducer.percentValues,
        status: state.statusReducer.status,
        msg: state.statusReducer.msg
    }   
}
const mapDispatchToProps =  dispatch => {
    return{
        getPrice: (price) => {dispatch(getPrice(price))},
        passSymbol: (symbol) => {dispatch(passSymbol(symbol))},
        getCompanyInfo: (companyData) => {dispatch(getCompanyInfo(companyData))},
        getChartInfo: (chartData) => {dispatch(getChartInfo(chartData))},
        getMultipleSymbols: (symbolAdd) => {dispatch(getMultipleSymbols(symbolAdd))},
        getMultipleSymbolsData: (symbolNames, percentValues) => {dispatch(getMultipleSymbolsData(symbolNames, percentValues))},
        errorOccurred: () => {dispatch(errorOccurred())},
        startRequest: () => {dispatch(startRequest())},
        completeRequest: () => {dispatch(completeRequest())},
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Form));