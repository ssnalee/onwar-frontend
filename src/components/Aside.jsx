import { Link } from "react-router-dom";
import styled from "styled-components";
const Side = styled.div`
  position: fixed;
  left: 0;
  top: 70px;
  display: flex;
  width: 90%;
  max-width: 200px;
  padding: 20px ;
  background-color: #e6e6e6;
  height: 100%;
`;
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  p{
    font-weight: 600;
    /* text-align: center; */
    color: ${props=> props.theme.colors.deep_gray};
  }
   a{
    /* color: ${props=> props.theme.colors.txt_reverse}; */
   }
`;
export default function Aside() {
    return (
        <Side>
            <Nav>
                <p>영웅</p>
                <div className="gray-line"></div>
                <Link to="/login">영웅 갤거리</Link>
                <Link to="/sign-up">소식</Link>
                <Link to="/search">배틀태그 검색</Link>
                <Link to="/search">내 배틀태그 관리</Link>
            </Nav>
        </Side>

    )
}

