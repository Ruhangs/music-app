import styled from "styled-components"
import style from "../../assets/global-style"

export const Container = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${props => props.play > 0 ? "60px": 0};
  width: 100%;
  .offical,.global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
  }
`;

export const EnterLoading = styled.div`
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  width: 100px;
  height: 100px;
  margin: auto;
`

