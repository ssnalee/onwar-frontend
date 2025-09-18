import styled, { keyframes } from "styled-components";

const SpinnerWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100px;
&.spinner-wrap{
  position: fixed;
  left: 50%;
  top : 40%;
  transform: translate(-50%,-50%);
}
.loader {
  width: 12px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
  &.w{
    animation: l2 1s infinite linear alternate;
  }
}
@keyframes l5 {
    0%  {box-shadow: 20px 0 #000, -20px 0 #0002;background: #000 }
    33% {box-shadow: 20px 0 #000, -20px 0 #0002;background: #0002}
    66% {box-shadow: 20px 0 #0002,-20px 0 #000; background: #0002}
    100%{box-shadow: 20px 0 #0002,-20px 0 #000; background: #000 }
}
@keyframes l2 {
    0%  { box-shadow: 20px 0 #fff, -20px 0 #fff2; background: #fff; }
    33% { box-shadow: 20px 0 #fff, -20px 0 #fff2; background: #fff2; }
    66% { box-shadow: 20px 0 #fff2, -20px 0 #fff; background: #fff2; }
    100%{ box-shadow: 20px 0 #fff2, -20px 0 #fff; background: #fff; }
}
/* HTML: <div class="loader"></div> */
.loader-text {
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  background:linear-gradient(90deg,#000 50%,#0000 0) right/200% 100%;
  animation: l21 2s infinite linear;
}
.loader-text::before {
  content :"Loading...";
  color: #0000;
  padding: 0 5px;
  background: inherit;
  background-image: linear-gradient(90deg,#fff 50%,#000 0);
  -webkit-background-clip:text;
          background-clip:text;
}

@keyframes l21{
  100%{background-position: left}
}
`;
const dots = keyframes`
  0%   { content: "" }
  33%  { content: "." }
  66%  { content: ".." }
  100% { content: "..." }
`;

const LoaderText = styled.div`
  font-weight: bold;
  /* font-family: monospace; */
  font-size: 30px;

  &::after {
    display: inline-block;
    animation: ${dots} 1.5s steps(3, end) infinite;
    content: "";
  }
`;

const Spinner = ({
    style,
    isFixed = false,
    isWhite = false,
    str = false,
    loadingText = null,
}) => {
    return (
        <SpinnerWrap className={isFixed ? 'spinner-wrap' : ''} style={style}>
          { loadingText ? (
             <LoaderText>{loadingText}</LoaderText>
          ) : (
             <div className={str ? "loader-text" : isWhite ? "loader w" : "loader"}></div>
          )}
          
        </SpinnerWrap>
    )
}

export default Spinner;