import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from  'recharts';

import styled from 'styled-components';

const ChartWrapper = styled.div` 
    max-width:700px;
    width:100%;
    height:320px;
    margin:20px auto;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
    @media (max-width: 400px) {
        height:200px;
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
                            <YAxis type="number" dataKey="high" domain={['auto', 'auto']}/>
                            <CartesianGrid strokeDasharray="5 5"/>
                            <Tooltip/>
                            <Legend />
                            <Line type="monotone" dataKey="high" stroke="blue" activeDot={{r: 8}}/>
                            <Line type="monotone" dataKey="low" stroke="black" activeDot={{r: 8}}/>
                            <Line type="monotone" dataKey="average" stroke="red" activeDot={{r: 8}}/>
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