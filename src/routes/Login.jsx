import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlinePermIdentity } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/userSlice";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/apiUser";
const LoginWrap = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 190px);
`;
const LoginTitle = styled.h2`
    margin-bottom: 30px;
    font-size: 20px;
`;
const LoginArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  gap: 20px;
  background-color: ${props=> props.theme.colors.primary};
  padding: 70px 50px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;
const LoginInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  input{
    /* text-align: right; */
  }

`;
const LoginBtn = styled.button`
    background-color: #000;
    width: 100%;
    padding: 12px 20px;
    color:#fff;
    border-radius: 5px;
`;



export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [err,setErr] = useState(null);
    const [userId, setUserId]  = useState("");
    const [userPw, setUserPw]  = useState("");
    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess : (data) => {
            console.log('data',data);
            if (data.error) {
                setErr(data.msg || "로그인 실패");
                return;
            }
            const userInfo = data?.data;
            localStorage.setItem("authToken",data?.data?.accessToken);
            localStorage.setItem("userInfo", JSON.stringify(data?.data));
            dispatch(setUserInfo(userInfo));
            navigate('/');
        },
        onError : (err) => {
            console.log('err',err);
            setErr(err?.response?.data?.msg || "서버 통신 실패");
        },
    });
    useEffect(()=>{
        const token = localStorage.getItem("authToken");
        if(token){
            navigate('/');
        }
    },[]);
    const handleLogin = () =>{
        if(!userId || !userPw){
            setErr("입력해");
           return; 
        }
        const userData = {
            username : userId,
            password : userPw
        }
        mutation.mutate(userData);
        // dispatch(setUserInfo(userData));
    }
    return (
        <LoginWrap>
            <LoginArea>
                <LoginTitle>로그인</LoginTitle>
                <LoginInput>
                    <label htmlFor="userId"><MdOutlinePermIdentity className="icon-sm" /></label>
                    <input type="text" id="userId" placeholder="아이디" value={userId} onChange={e=>setUserId(e.target.value)} />
                </LoginInput>
                <LoginInput>
                    <label htmlFor="userPw"><RiLockPasswordLine className="icon-sm" /></label>
                    <input type="password" id="userPw" placeholder="비밀번호" value={userPw} onChange={e=>setUserPw(e.target.value)} />
                </LoginInput>
                <LoginInput>
                    <p className="err ft__8">{err}</p>
                </LoginInput>
                <LoginInput>
                    <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
                </LoginInput>
                <Link to="/sign-up" className="ft__7">아직 계정이 없으신가요? <span className="underline">회원가입</span></Link>
            </LoginArea>

        </LoginWrap>
    );
}