import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from  'recharts';

import styled from 'styled-components';

const ChartWrapper = styled.div` 
    max-width:700px;
    width:100%;
    height:320px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
    @media (max-width: 400px) {
        height:200px;
        max-width:300px;
    }

`;
class Chart extends Component {

        render() { 
            return (
                <ChartWrapper>
                    <ResponsiveContainer>
                        <LineChart  data={this.props.chartData}
                                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="label"/>
                            <YAxis type="number"  domain={['dataMin - 10', 'dataMax + 10']}/>
                            <CartesianGrid strokeDasharray="3 3 "/>
                            <Tooltip/>
                            <Legend />
                            <Line type="monotone" dataKey="high" stroke="green" />
                            <Line type="monotone" dataKey="low" stroke="red" />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartWrapper>
            );
        }   
}

const mapStateToProps = (state) => {
    return{
        chartData: state.chartReducer.chartData
    }   
}

export default withRouter(connect(mapStateToProps)(Chart));