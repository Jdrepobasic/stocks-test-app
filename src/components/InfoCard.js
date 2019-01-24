import React from 'react';
import styled from 'styled-components';

import QuotePrice from './QuotePrice';
import SimpleText from './SimpleText';

const CardWrapperStyled = styled.div`
    display:flex;
    width:auto;
    max-width:500px;
    height:180px;
    margin:0 auto;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    background-color:#4A00E0;
    border-radius:20px;
    color:white;
    padding:20px;
`;

const CompanyNameStyled = styled.h2`
    font-size: 20px;
    text-transform: Capitalize;
    margin:0;
`;


function InfoCard(props) {
    return (
        <CardWrapperStyled>
            <CompanyNameStyled>{props.companyName}</CompanyNameStyled>
            <SimpleText text={props.symbol}></SimpleText>
            <SimpleText text={props.exchange}></SimpleText>
            <QuotePrice text={props.price}/>  
        </CardWrapperStyled>

    );
}

export default InfoCard;