import styled, { keyframes } from "styled-components";
import style from '../../assets/global-style'

const loading = keyframes`
  0%, 100% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
`

export const LoadingWrapper  = styled.div`
  >div {
    position: fixed;
    z-index: 1000;
    left: 0; 
    right: 0;  
    top: 0;
    bottom: 0;
    margin: auto;
    width: 60px;
    height: 60px;
    opacity: 0.6;
    border-radius: 50%;
    background-color: ${style["theme-color"]};
    animation: ${loading} 1.4s infinite ease-in;
  }
  >div:nth-child (2) {
    animation-delay: -0.7s;
  }
`

const dance = keyframes`
    0%, 40%, 100%{
      transform: scaleY (0.4);
      transform-origin: center 100%;
    }
    20%{
      transform: scaleY (1);
    }
`
export const Loading2 = styled.div`
    height: 10px;
    width: 100%;
    margin: auto;
    text-align: center;
    font-size: 10px;
    >div {
      display: inline-block;
      background-color: ${style["theme-color"]};
      height: 100%;
      width: 1px;
      margin-right:2px;
      animation: ${dance} 1s infinite;
    }
    >div:nth-child (2) {
      animation-delay: -0.4s;
    }
    >div:nth-child (3) {
      animation-delay: -0.6s;
    }
    >div:nth-child (4) {
      animation-delay: -0.5s;
    }
    >div:nth-child (5) {
      animation-delay: -0.2s;
    } 

`