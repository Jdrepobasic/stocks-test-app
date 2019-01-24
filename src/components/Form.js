import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import styled from 'styled-components';
import BasicButton from './BasicButton';

import axios from 'axios';

import { getPrice, passSymbol } from '../actions/QuoteActions';
import { getCompanyInfo } from '../actions/CompanyAction';
import { getChartInfo } from '../actions/ChartActions';


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
    
    handleChange(event) {
        this.setState({value: event.target.value}); 
        
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.passSymbol(this.state.value);
        setTimeout(() => {
            setInterval(() => {
                axios.all([
                    axios.get(`https://api.iextrading.com/1.0/stock/${this.props.symbol}/quote`),
                    axios.get(`https://api.iextrading.com/1.0/stock/${this.props.symbol}/company`),
                    axios.get(`https://api.iextrading.com/1.0/stock/${this.props.symbol}/chart/1d?chartLast=8`),
                ])
                .then(axios.spread((resQuote, resCompany, resChart) => {
                    this.props.getPrice(resQuote.data.latestPrice);
                    this.props.getCompanyInfo(resCompany.data);
                    this.props.getChartInfo(resChart.data);
                    console.log(this.props.chartData);
                }));   
            }, 2000);
        }, 100);
    }
    render() { 
    
        return (
            <FormWrapperStyled>
                <FormCompStyled onSubmit={this.handleSubmit}>
                    <LabelStyled>SYMBOL( e.g: aapl for apple ):</LabelStyled>
                    <InputStyled type="text" value={this.state.value} onChange={this.handleChange} required></InputStyled>
                    <BasicButton type="submit" text="Buscar informações"></BasicButton>
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
        chartData: state.chartReducer.chartData
    }   
}
const mapDispatchToProps =  dispatch => {
    return{
        getPrice: (price) => {dispatch(getPrice(price))},
        passSymbol: (symbol) => {dispatch(passSymbol(symbol))},
        getCompanyInfo: (companyData) => {dispatch(getCompanyInfo(companyData))},
        getChartInfo: (chartData) => {dispatch(getChartInfo(chartData))}
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Form));