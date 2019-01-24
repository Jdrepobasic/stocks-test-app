import React from 'react';

import styled from 'styled-components';

const BasicButtonStyled = styled.button`
    background-image: linear-gradient(to right, #8E2DE2 0%, #4A00E0 100%);
    border-radius: 40px;
    box-sizing: border-box;
    display: block;
    height: 40px;
    margin: 0 auto;
    padding: 4px;
    position: relative;
    width:100%;
    max-width:500px;
    z-index: 2;
    cursor:pointer;
`;
const ButtonText = styled.span`
    align-items: center;
    background: #fff;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    height: 100%;
    transition: background .5s ease;
    width: 100%;
    border:none;
    cursor:pointer;
    text-decoration: none;
    text-transform: uppercase;
    color:#4A00E0;
    font-size:15px;
    :hover {
        background: transparent;
        color: #fff;
    }
`;

function BasicButton(props) {
    return (<BasicButtonStyled>
                <ButtonText>{props.text}</ButtonText>
            </BasicButtonStyled>);
}

export default BasicButton;