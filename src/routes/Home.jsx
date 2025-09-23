import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getHashtagList } from "@/api/apiTag";
import { TbZzz } from "react-icons/tb";
import styled from 'styled-components';
import Spinner from '@/components/Spinner';
import DashboardHeros from '@/components/dashboard/DashboardHeros';

const ButtonWrap = styled.div`
  z-index: 22;
  position: relative;
  height: 600px;
  font-family: ${({ theme }) => theme.fontFamily.sub3}, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button{
    font-family: ${({ theme }) => theme.fontFamily.sub3}, sans-serif;
    background-color: #ffffff;
    width: 300px;
    height: 100px;
    font-size: 2rem;
    border: 4px solid #ffd000;
  }
  p{
    margin-top:20px;
    font-size: 1.5rem;
  }

`;

export default function Home() {
    const [onApi, setOnApi] = useState(false);

    const { refetch, isFetching } = useQuery({
        queryKey: ['tagNo'],
        queryFn: () => getHashtagList(0),
        enabled: false,
    });


    const apiLoadingHandler = () => {
        refetch();
        const expireTime = Date.now() + 10 * 60 * 1000; 
        sessionStorage.setItem("onApiExpire", expireTime.toString());
        setOnApi(true);
    }

    useEffect(() => {
        const expireTime = sessionStorage.getItem("onApiExpire");
        if (expireTime) {
            const now = Date.now();
            if (now < Number(expireTime)) {
              setOnApi(true);
        
              const timeout = setTimeout(() => {
                sessionStorage.removeItem("onApiExpire");
                setOnApi(false);
              }, Number(expireTime) - now);
        
              return () => clearTimeout(timeout);
            } else {
              sessionStorage.removeItem("onApiExpire");
              setOnApi(false);
            }
          }
    }, [])
    return (
        <>
            {isFetching ?
                (
                    <Spinner loadingText={"서버 깨우는 중"} isFixed={true} style={{ left: "calc(50% + 100px)", fontFamily: "Jua, sans-serif", top: "45%" }} />
                ) : onApi ? (
                    <>
                        <DashboardHeros />
                    </>

                ) : (
                    <ButtonWrap>
                        <button onClick={() => { apiLoadingHandler() }}>API 깨우기 <TbZzz /></button>
                        <p>무료 서버라 잠깐 쉬고 있어요. "API 깨우기"를 눌러주세요!</p>
                    </ButtonWrap>
                )}

        </>
    )
}