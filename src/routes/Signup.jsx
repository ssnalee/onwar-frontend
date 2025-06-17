import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlinePermIdentity } from "react-icons/md";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signUpUser, verifyUserId } from "../api/apiUser";
const SignWrap = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 190px);
`;
const SignTitle = styled.h2`
    margin-bottom: 30px;
    font-size: 20px;
`;
const SignArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  gap: 20px;
  background-color: ${props => props.theme.colors.primary};
  padding: 70px 50px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  .confirm-btn{
    background-color: #fff;
    padding: 10px 7px;
    border-radius: 5px;
    width: 50px;
    &:hover{
        background-color: #000;
        color: #fff;
    }
  }
  .err-msg{
    color:#e70000;
  }
`;
const SignInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  input{
    /* text-align: right; */
  }
`;
const SignBtn = styled.button`
    background-color: #000 ;
    width: 100%;
    padding: 12px 20px;
    color:#fff;
    border-radius: 5px;
`;
export default function Signup() {
    const navigate = useNavigate();
    const [err, setErr] = useState(null);
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const [userPw2, setUserPw2] = useState("");
    const [verifyId, setVerifyId] = useState(false);
    const signUpMutation = useMutation({
        mutationFn : signUpUser,
        onSuccess: (data) => {
            console.log('data',data);
            if (data.error) {
                setErr(data.msg || "회원가입 실패");
                return;
            } 
            navigate('/login');
            
        },
        onError: (err) => {
            setErr(err?.response?.data?.msg || "서버 통신 실패");
        },
    });
    const checkIdMutation = useMutation({
        mutationFn : verifyUserId,
        onSuccess: (data) => {
            if (data.error) {
                setErr(data.msg);
                return;
            } 
            const isExist = data.data?.isExist;
            if(isExist){
                setErr("중복된 아이디입니다.");
                setVerifyId(false);
            }else{
                setErr(null);
                setVerifyId(true);
            }
        },
        onError: (err) => {
            setErr(err?.response?.data?.msg || "서버 통신 실패");
        },
    });


    const handleVerifyId = () => {
        checkIdMutation.mutate(userId);
    };

    const handleSignup = () => {
        if (!verifyId) return;
        if (!userPw || !userPw2 || userPw !== userPw2) return;

        const userData = {
            username: userId,
            password: userPw,
            confirm_password: userPw2,
        };

        signUpMutation.mutate(userData);
    };

    return (
        <SignWrap>
            <SignArea>
                <SignTitle>회원가입</SignTitle>
                <SignInput>
                    <label htmlFor="userId"><MdOutlinePermIdentity className="icon-sm" /></label>
                    <input type="text" id="userId" placeholder="아이디" disabled={verifyId} value={userId} onChange={e => setUserId(e.target.value)} />
                    <button className="confirm-btn" onClick={handleVerifyId} disabled={verifyId}>확인</button>
                </SignInput>
                <SignInput>
                    <label htmlFor="userPw"><MdOutlinePermIdentity className="icon-sm" /></label>
                    <input type="password" id="userPw" placeholder="비밀번호" value={userPw} onChange={e => setUserPw(e.target.value)} />
                </SignInput>
                <SignInput>
                    <label htmlFor="userPw2"><MdOutlinePermIdentity className="icon-sm" /></label>
                    <input type="password" id="userPw2" placeholder="비밀번호 확인" value={userPw2} onChange={e => setUserPw2(e.target.value)} />
                </SignInput>
                <p class="err-msg">{err}</p>
                <SignInput>
                    <SignBtn onClick={handleSignup}>계정 만들기</SignBtn>
                </SignInput>
                <Link to="/login" className="ft__7">이미 계정이 있으신가요? <span className="underline">로그인</span></Link>
            </SignArea>
        </SignWrap>
    )

}