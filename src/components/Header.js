import React from 'react';
import styled from 'styled-components';

const HeaderTitleStyled = styled.h2`
    font-size: 30px;
    text-transform: uppercase;
    color:#4A00E0;
    text-align:center;
`;

function Header(props) {
    return <HeaderTitleStyled>{props.title}</HeaderTitleStyled>;
}

export default Header;