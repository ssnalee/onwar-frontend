import { useSelector, useDispatch } from 'react-redux';
import { increment } from '@/store/counterSlice';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHashtagList } from "@/api/apiTag";
import { TbZzz } from "react-icons/tb";
import ConfirmModal from '@/components/modal/modalConfirm';
import styled from 'styled-components';
import Spinner from '@/components/Spinner';
import DashboardHeros from '@/components/dashboard/DashboardHeros';

const ButtonWrap = styled.div`
  /* position: fixed; */
  /* left: calc(50% + 100px); */
  z-index: 22;
  position: relative;
  height: 600px;
  /* left: 50%;
  top: 50%;
  transform: translate(-50%,-50%); */
  font-family: ${({ theme }) => theme.fontFamily.sub3}, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* width: 600px; */
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
    const count = useSelector((state) => state.counter.value);
    const [userNo, setUserNo] = useState(1);
    const [tagNo, setTagNo] = useState(0);
    const [onApi, setOnApi] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // dispatch(setTodos(newTodosArray));
    // const { data, error, isLoading ,refetch } = useQuery({
    //     queryKey: ['test'],
    //     queryFn: getTest
    // });
    const { data, error, refetch, isFetching } = useQuery({
        queryKey: ['tagNo', tagNo],
        queryFn: () => getHashtagList(tagNo),
        enabled: false,
    });
    // const { data, error, isLoading, refetch } = useQuery({
    //     queryKey: ['test', userNo],
    //     queryFn: () => getTest(userNo)
    // });


    const [visible, setVisible] = useState(true);

    const handleClose = (key) => {
        if (key === 1) {
            alert('확인 눌림');
        } else {
            alert('취소 눌림');
        }
        setVisible(false);
    };
    const apiLoadingHandler = () => {
        refetch();
        sessionStorage.setItem("onApi", "true");
        setOnApi(true);
        setTimeout(() => {
            sessionStorage.setItem("onApi", "false");
            setOnApi(false);
          }, 10 * 60 * 1000);
    }

    useEffect(() => {
        const storedApi = sessionStorage.getItem("onApi") === "true";
        setOnApi(storedApi);
    }, [])
    return (
        <>
            {/* <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={()=> setUserNo(prev=>prev+1)}>data</button> */}
            <p>{ }</p>

            {/* <ConfirmModal
                isVisible={visible}
                title="정말 삭제하시겠습니까?"
                content="삭제하면 되돌릴 수 없습니다."
                onCloseDialogHandler={handleClose}
            /> */}


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