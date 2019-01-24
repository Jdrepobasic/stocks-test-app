import React from 'react';
import styled from 'styled-components';

const SimpleTextStyle = styled.p`
    font-size: 18px;
    margin:0;
`;

function SimpleText(props) {
    return <SimpleTextStyle>{props.text}</SimpleTextStyle>;
}

export default SimpleText;