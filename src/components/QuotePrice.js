import React from 'react';
import styled from 'styled-components';

const QuotePriceStyled = styled.p`
    font-size: 26px;
    text-transform: uppercase;
    font-weight:bold;
    margin:0;
`;

function QuotePrice(props) {
    return <QuotePriceStyled>{props.text}</QuotePriceStyled>;
}

export default QuotePrice;