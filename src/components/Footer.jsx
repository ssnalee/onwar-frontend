import styled from "styled-components"

const FooterWrap = styled.footer`
   position: absolute;
   bottom: 0;
   left: 0;
   background-color: #000;
   width: 100vw;
   height: 100px;
   color:#fff;
   display: flex;
   align-items: center;
   justify-content: center;
`;

export default function Footer(){
    return (
        <FooterWrap>
              <small>© 2025 이승아. All rights reserved.</small>
        </FooterWrap>
    )
}