import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ErrorContainer = styled.div`
    position: relative;
    top: 200px;
    left: 50%;
    width: 400px;
    height: 250px;
    border: 1px solid #000;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #fff;
    *{
        font-family: ${({ theme }) => theme.fontFamily.main}, sans-serif;
    }
    h1{
        font-weight: 600;
    }
    button{
        background-color: #ffd000;
        padding: 10px 15px;
        margin-top: 20px;
        font-size: 1.5rem;
    }
`;

export default function Error () {
    const navigate = useNavigate();
    return (
        <ErrorContainer>
          <h1>⚠️ 서버 오류가 발생했습니다.</h1>
          <p>잠시 후 다시 시도해주세요.</p>
          <button onClick={() => navigate("/")}>홈으로 이동</button>
        </ErrorContainer>
      );
}