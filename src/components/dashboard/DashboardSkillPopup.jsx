import styled from "styled-components";
import ModalFrame from "../modal/modalFrame";
import Spinner from "@/components/Spinner"
import { getHerosIntroduction } from "@/api/apiOw";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";

const ModalWrap = styled.div`
  position: relative;
  padding: 20px;
  color:#fff;
`;

const Button = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  svg{
    cursor: pointer;
  }

`;
const HeroContainer = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.sub2}, sans-serif;
  h5{
    border-bottom: 3px double #fff;
    width: fit-content;
    font-size : 2rem;
    margin-bottom: 20px;
  }
  p{
    line-height: 1.5rem;
  }
`;

const HerosIntro = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .name{
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;
const HerosHealth = styled.div`
  display: flex;
  justify-content: center;
  >div{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .sign{
    width: 50px;
    text-align: center;
  }
`;
const HerosSkill = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media screen and (max-width:768px){
    grid-template-columns: 1fr;
  }
  li{
    display: flex;
    gap: 10px;
  }
  .img-wrap{
    border: 1px solid #fff;
    border-radius: 50%;
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    flex-shrink: 0;
    img{
        width: 100%;
    }
  }
  .text-wrap{
    width: 100%;
    padding: 20px 0;
  }
  .skilname{
    font-size: 1.5rem;
    /* text-align: center; */
    margin-bottom: 10px;
  }
`;

export default function DashboardSkillPopup({ isVisible, heros, onCloseDialogHandler }) {
    const { data, isLoading } = useQuery({
        queryKey: ['heros', heros],
        queryFn: () => getHerosIntroduction(heros?.key),
    })

    useEffect(() => {
        console.log(data);
    }, [data])

    const closeHandler = () => {
        onCloseDialogHandler?.();
    };

    return (
        <ModalFrame
            isVisible={isVisible}
            width="90%"
            height="600px"
            maxWidth="1000px"
            style={{ border: '1px solid #fff', background: '#0616539c' }}
            isOverlay={true}
            onCloseDialogHandler={closeHandler}
        >
            {
                isLoading ?
                    <Spinner isWhite={true} /> :
                    <ModalWrap>
                        <Button>
                            <IoIosCloseCircleOutline fontSize={50} color="#fff" onClick={() => closeHandler()} />
                        </Button>
                        <HeroContainer>
                            <h5>PROFILE</h5>
                            <HerosIntro>
                                <img src={data?.portrait} alt={data?.name} />
                                <div>
                                    <p className="name">{data?.name}</p>
                                    <p>나이 : {data?.age}</p>
                                    <p>생일 : {data?.birthday}</p>
                                    <p>지역 : {data?.location}</p>
                                    <p>포지션 : {data?.role === 'tank' ? '탱커' : data?.role === 'damage' ? '딜러' : '서포터'}</p>
                                    {/* <p>요약 : {data?.description}</p> */}
                                    <p>설명 : {data?.story?.summary}</p>
                                </div>
                            </HerosIntro>
                            <h5>HEALTH</h5>
                            <HerosHealth>
                                <span>{data?.hitpoints.total} ( 총 HP ) </span>
                                <span className="sign"> = </span>
                                <div>
                                    <span className="mb__5">{data?.hitpoints.armor} ( 방어력 ) </span>
                                    <span className="ft__8 yellow"><FaExclamationCircle color={"#ffe816"} /> 일반 체력보다 피해 25% 감소</span>
                                </div>
                                <span className="sign">+</span>
                                <div>
                                    <span className="mb__5">{data?.hitpoints.shields} ( 보호막 ) </span>
                                    <span className="ft__8 yellow"><FaExclamationCircle color={"#ffe816"} /> 시간이 지나면 자동 회복</span>
                                </div>
                                <span className="sign">+</span>
                                <span>{data?.hitpoints.health} ( HP )</span>

                            </HerosHealth>
                            <h5>SKILL</h5>
                            <HerosSkill>
                                {data?.abilities?.map((item) => (
                                    <li>
                                        <div className="img-wrap">
                                            <img src={item.icon} alt={item.name} />
                                        </div>
                                        <div className="text-wrap">
                                            <p className="skilname">{item.name}</p>
                                            <p>{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </HerosSkill>
                        </HeroContainer>
                    </ModalWrap>
            }

        </ModalFrame>
    )
}