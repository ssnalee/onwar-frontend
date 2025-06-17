import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setUserInfo } from "../store/userSlice";
import { useEffect } from "react";
const Head = styled.header`
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 50px;
  height: 70px;
  background-color: ${props => props.theme.colors.primary};
  h1{
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
const Nav = styled.nav`
   a,button{
    margin-left: 20px;
    font-size:1rem;
    /* color: ${props => props.theme.colors.txt_reverse}; */
   }
`;
export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user.userInfo);
    const handleLogout = () => {
        dispatch(setUserInfo(""));
        localStorage.clear();
    }
    useEffect(() => {
        if (userInfo === "") {
            navigate('/login');
        }
    }, [userInfo]);
    return (
        <Head>
            <h1>
                <img src="/images/heros/default.svg" />
                ON WAR</h1>
            <Nav>
                {userInfo ? (
                    <button onClick={handleLogout}>로그아웃</button>
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/sign-up">회원가입</Link>
                    </>
                )}
            </Nav>
        </Head>

    )
}

