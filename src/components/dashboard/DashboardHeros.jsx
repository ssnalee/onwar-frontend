import { getHeros } from "@/api/apiOw";
import { heros } from "@/utils/heros";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import DashboardSkillPopup from "./DashboardSkillPopup";

const HeroArea = styled.ul`
  margin-top: 50px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 5px;
  @media screen and (max-width:1024px){
    grid-template-columns: repeat(4, 1fr);
  }
  :hover{
    transform: scale(1.2);
   }
  li{
    overflow: hidden;
    cursor: pointer;
  }
  img{
    width: 100%;
  }
  p{
    text-align: center;
    padding: 20px 0;
    color: #fff;
  }


`;

export default function DashboardHeros() {
    const [selectedHeros,setSelectedHeros] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const { data } = useQuery({
        queryKey: ['heros'],
        queryFn: () => getHeros(),
    });
    const herosArr = useMemo(() => {
        if (!data) return [];
        const arr = data.map(item => {
            const extra = heros[item.key];
            return {
                ...item,
                color: extra?.color || "",
            };
        });
        return arr.sort((a, b) => {
            const order = {
                tank: 1,
                damage: 2,
                support: 3, 
            };
            return (order[a.role] || 99) - (order[b.role] || 99);
        })
    }, [data]);
    const openSkillPopup = (item) => {
        setSelectedHeros(item)
        setIsVisible(true);
    }
    useEffect(() => {
        if (herosArr) {
            console.log('herosArr changed', herosArr);
        }
    }, [herosArr]);
    return (
        <>
            <HeroArea>
                {herosArr.map(item => (
                    <li style={{ backgroundColor: item.color }} onClick={()=>{openSkillPopup(item)}}>
                        <img src={item.portrait} />
                        <p>{item.name}</p>
                    </li>
                ))}
            </HeroArea>
            <DashboardSkillPopup
               isVisible={isVisible}
               heros={selectedHeros} 
               onCloseDialogHandler={()=>setIsVisible(false)}
            />
        </>
    );
}