import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/api";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiCheck } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
const SearchTitle = styled.h3`
   margin: 50px 0;
   display: flex;
   align-items: center;
   gap: 5px;
   font-size: 20px;
`;
const SearchWrap = styled.div`
   display: flex;
   input{
    width: 100%;
    border: 1px solid #d3d3d3;
    border-radius: 0;
   }
   button{
    width: 100px;
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.colors.txt};
    color: ${({ theme }) => theme.colors.txt_reverse};
   }
   >div{
    position: relative;
    margin-left: 10px;
    width: 80px;
    flex-shrink: 0;

    p{
        background-color: #fff;
        padding: 15px 5px;
        border: 1px solid #999;
        display: flex;
        justify-content: space-between;
    }
   }
`;
const DropDown = styled.div`
  position: absolute;
  width: 100%;
  top: 50px;
  background-color: #fff;
  padding: 10px 15px;
  border: 1px solid #999;
  ul{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  li{
    display: flex;
    justify-content: space-between;
  }
`;

const BattleTagWrap = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  .player-ico{
    width: 50px;
    box-shadow: 3px 5px 5px rgba(0,0,0,0.1);
  }
  .player-wrap{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  p{
    background-color: #fff;
    /* color:#fff; */
    padding: 17px 50px 17px 20px;
    box-shadow: 3px 5px 5px rgba(0,0,0,0.1);
  }

`;
const TierWrap = styled.div`
width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 3px 5px 5px rgba(0,0,0,0.1);
  /* gap: 10px; */
  >div{
    width: 25%;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* gap: 10px; */
    .tier {
    background-color: #fff;
    width: 100%;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    /* border-bottom: 2px solid #000; */
    }
    &:nth-child(1){
        .tier{
            border-left: none;
        }
    }
    &:last-child{
        .tier{
            border-right: none;
        }
    }
  }
  .pos{
    width: 100%;
    /* background-color: ${({ theme }) => theme.colors.primary}; */
    padding: 10px;
    background-color: #000;
    /* border-radius: 50%; */
    /* max-width: 100px; */
    display: flex;
    align-items: center;
    border: 1px solid #fff;

  }
  .pos-ico{
    padding: 5px;
    width: 50px;
    margin: 0 auto;
  }

  .img-wrap{
    position: relative;
    /* height : 60px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    .rank-ico{
        width: 70px;
        /* position: absolute;
        top: 0; */
    }
    .Diamond{
        position: relative;
        left: -1px;
    }
    .div-ico{
        width: 70px;
        /* position: absolute;
        bottom: 0;
        left: -5px; */
    }
  }
`;

const HeroWrap = styled.div`
  h5{
    font-size: 1.3rem;
    margin: 30px 0;
    display: flex;
    gap: 10px;
    span{
        background-color: ${({ theme }) => theme.colors.primary};
        color:#fff;
        padding: 5px;
        font-size: 0.8rem;
        border-radius: 20px;
    }
  }
`;
const Competition = styled.div`
  display: flex;
  align-items: center;
  
  >p{
    width: 150px;
  }
`;
const StatList = styled.ul`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
gap: 5px;
margin-bottom: 20px;
`;
const StatItem = styled.li`
  width: 100%;
  p{
    width: 100%;
    text-align: center;
  }
  p:first-child{
    padding: 5px;
    background-color: #0081c7;
    color :#fff;
  }
  p:last-child{
    padding: 5px;
    background-color: #fff;
  }
  box-shadow: 3px 5px 5px rgba(0,0,0,0.1);
`;

export default function SearchUser() {
    const platforms = ['pc', 'etc'];
    const regions = ['us', 'eu', 'asia'];
    const [isDropdown, setIsDropdown] = useState(false);
    const [isDropdown2, setIsDropdown2] = useState(false);
    const [platform, setPlatform] = useState("pc");
    const [region, setRegion] = useState("asia");
    const [battletag, setBattletag] = useState("mercy76#3111");
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['battletag', battletag],
        queryFn: () => getProfile({ platform, region, battletag })
    });
    const selectedPlatform = (item) => {
        setPlatform(item);
        setIsDropdown(false);
    }
    const selectedRegion = (item) => {
        setRegion(item);
        setIsDropdown2(false);
    }
    useEffect(() => {
        refetch();
        console.log('data', data);
    }, [])
    return (
        <>
            <SearchTitle><FaSearch />배틀태그 검색</SearchTitle>
            <SearchWrap>
                <input type="text" placeholder="배틀태그 예) 홍길동#1234" />
                <button>검색</button>
                <div>
                    <p onClick={() => setIsDropdown(!isDropdown)}>{platform.toUpperCase()}
                        {isDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </p>
                    {isDropdown ? <DropDown className="dropdown">
                        <ul>
                            {platforms.map((item) => (
                                <li onClick={() => selectedPlatform(item)}>
                                    {item.toUpperCase()} {platform === item && <FiCheck />}
                                </li>
                            ))}
                        </ul>
                    </DropDown> : null}
                </div>
                <div>
                    <p onClick={() => setIsDropdown2(!isDropdown2)}>{region.toUpperCase()}
                        {isDropdown2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </p>
                    {isDropdown2 ? <DropDown className="dropdown">
                        <ul>
                            {regions.map((item) => (
                                <li onClick={() => selectedRegion(item)}>
                                    {item.toUpperCase()} {region === item && <FiCheck />}
                                </li>
                            ))}
                        </ul>
                    </DropDown> : null}
                </div>
            </SearchWrap>
            <BattleTagWrap>
                <div className="player-wrap">
                    <img className="player-ico" src={data?.icon} />
                    <p>{data?.name}</p>
                </div>
                <TierWrap className="tier-wrap">
                    {
                        data?.ratings.map((v, idx) => (
                            <div key={idx}>
                                <div className="pos">
                                    <img className="pos-ico" src={v.roleIcon} alt={v.role} />
                                </div>
                                <div className="tier">
                                    <div className="img-wrap">
                                        <img className={`${v.group} rank-ico`} src={v.rankIcon} />
                                        <img className="div-ico" src={v.divisionIcon} alt={`${v.group} ${v.tier}`} />
                                    </div>
                                    {/* <p> 랭크 {v.group} {v.tier}</p> */}
                                </div>
                            </div>
                        ))
                    }
                </TierWrap>
            </BattleTagWrap>
            <HeroWrap>
                <h5>경쟁전 영웅별 스탯 <span>{data?.competitiveStats?.season}시즌</span> </h5>
                {Object.entries(data?.competitiveStats?.careerStats
                ).map(([heroName, heroData]) => (
                    <Competition key={heroName}>
                        <p>{heroName}</p>
                        <StatList>
                            <StatItem>
                                <p>플레이 시간</p>
                                <p>{heroData?.game?.timePlayed}</p>
                            </StatItem>
                            <StatItem>
                                <p>승 / 패 (승률)</p>
                                <p>{heroData?.game?.gamesWon} / {heroData?.game?.gamesLost} ({heroData?.game?.winPercentage})</p>
                            </StatItem>
                            <StatItem>
                                <p>10분당 목처</p>
                                <p>{heroData?.average?.deathsAvgPer10Min}</p>
                            </StatItem>
                            <StatItem>
                                <p>10분당 데미지</p>
                                <p>{heroData?.average?.heroDamageDoneAvgPer10Min}</p>
                            </StatItem>
                            <StatItem>
                                <p>10분당 힐량</p>
                                <p>{heroData?.average?.healingDoneAvgPer10Min}</p>
                            </StatItem>

                        </StatList>

                    </Competition>
                ))}
                <div>
                    {/* <p>{data?.competitiveStats?.topHeroes[0]}</p>
                    <div>
                        <p>플레이 시간</p>
                        <p></p>
                    </div> */}
                </div>
            </HeroWrap>
        </>
    );
}