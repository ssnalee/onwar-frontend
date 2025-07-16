import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { getHashtagList } from "../../api/apiTag";
import { hashtagColor } from "../../utils/hashtag";
import styled from "styled-components";

const Title = styled.h3`
   margin: 50px 0;
   display: flex;
   align-items: center;
   gap: 5px;
   font-size: 40px;
   color:#616161;
   /* font-weight: 400; */
`;
const HashtagTitle = styled.h4`
  font-size: 2rem;
  text-align: center;
`;
const HashtagList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 50px;
  li{
    padding:10px;
    width: fit-content;
    border-radius: 5px;
    cursor: pointer;
  }
`;
const HashtagSearch = styled.div`
  background-color: #fff;
  border: 1px solid #d3d3d3;
  min-height: 50px;
  display: flex;
  flex-wrap: wrap;
  div{
    padding:10px;
    margin: 5px;
    width: fit-content;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;

export default function Competitive() {
    const [tagNo, setTagNo] = useState(0);
    const [tagItems, setTagItems] = useState([]);
    const { data, error } = useQuery({
        queryKey: ['tagNo', tagNo],
        queryFn: () => getHashtagList(tagNo)
    });
    const coloredData = useMemo(() => {
        if (!data?.data) return [];
        return data?.data.map(item => ({
            ...item,
            color: hashtagColor[item.id] || "#000"
        }));
    }, [data]);
    const handleClickHashtag = (item) => {
        setTagItems(prevItems=> {
            const isExist = prevItems.some(i => i.id === item.id);
            if (isExist) return prevItems;
            return [...prevItems, item];
        });
    }
    const handleDelete = (id) => {
        setTagItems(prevItems=> prevItems.filter(item=>item.id !== id));
    }

    return (
        <>
            <Title>경쟁전 파티 구함</Title>
            <HashtagTitle>태그 검색</HashtagTitle>
            <HashtagList>
                {coloredData.map((item) => (
                    <li 
                      key={item.id} 
                      style={{ backgroundColor: item.color }}
                      onClick={()=>handleClickHashtag(item)}
                      >
                        {item.tag}
                    </li>
                ))}
            </HashtagList>
            <HashtagSearch>
                {tagItems.map(item=>(
                    <div
                    key={item.id} 
                    style={{ backgroundColor: item.color }}
                    >
                        <p>{item.tag}</p>
                        <TiDelete onClick={()=>handleDelete(item.id)} />
                    </div>
                ))}
            </HashtagSearch>

        </>
    )
}