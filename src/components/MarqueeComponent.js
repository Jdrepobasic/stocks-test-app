import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Marquee from "react-smooth-marquee";
import styled from 'styled-components';

// creating styled elements
const MyMarqueeStyled = styled.div`
    .Marquee{
        background-color:#eeeeee;
        overflow:hidden;
    }
    .MarqueeContent{
        width:500px;
    }
    @media (max-width: 500px){
        .MarqueeContent{
            width:200px;
        }
    }
`;

const FallingPercent = styled.span`
    color:red;
    margin-right:20px;
`;
const RaisingPercent = styled.span`
    color:green;
    margin-right:20px;
`;
class MarqueeComponent extends Component {
    constructor(props) {
        super(props);
        this.createMarqueeData = this.createMarqueeData.bind(this);
    }
    // crindo string para alimentar a marquee
    createMarqueeData(){
        var fullArrayInfo = [];
        if(this.props.symbolNames.length > 0 ){
                for (let i = 0; i < this.props.symbolNames.length; i++) {
                    fullArrayInfo.push(this.props.symbolNames[i]);
                    fullArrayInfo.push(": ");
                if(parseFloat(this.props.percentValues[i]) > 0){
                    fullArrayInfo.push(<RaisingPercent  key={this.props.symbolNames[i]}>+{this.props.percentValues[i]}%</RaisingPercent>);
                    
                }else{
                    fullArrayInfo.push(<FallingPercent key={this.props.symbolNames[i]} >{this.props.percentValues[i]}%</FallingPercent>);
                    
                }
            }
        }
        return <span>{fullArrayInfo}</span>
    }
    render() {

        return (
            <MyMarqueeStyled>
                <Marquee>
                        {this.createMarqueeData()}
                </Marquee>
            </MyMarqueeStyled>
        );
        
    }
}

const mapStateToProps = (state) => {
    return{
        symbolNames: state.marqueeReducer.symbolNames,
        percentValues: state.marqueeReducer.percentValues
    }   
}

export default withRouter(connect(mapStateToProps)(MarqueeComponent));