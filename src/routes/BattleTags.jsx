import { useState } from "react";
import styled from "styled-components";
import { TiDelete } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
const Title = styled.h3`
   margin: 50px 0;
   display: flex;
   align-items: center;
   gap: 5px;
   font-size: 40px;
   color:#616161;
   /* font-weight: 400; */
`;
const SaveWrap = styled.div`
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
`;
const BattleTagList = styled.div`
    background-color: ${({ theme }) => theme.colors.primary};
    border: 2px solid  ${({ theme }) => theme.colors.txt};
    margin-top: 50px;
    padding: 50px;
    >p{
        color:#fff;
        font-size: 25px;
        border-bottom: 3px solid ${({ theme }) => theme.colors.txt_reverse};
        width: fit-content;
    }
    .tag-list{
        padding: 20px 0;
        li{
            padding: 10px 0;
            font-size: 20px;
            display: flex;
            align-items: center;
            font-family: ${({ theme }) => theme.fontFamily.sub2}, sans-serif;
            font-weight: 600;
            p{
                cursor: pointer;
            }
        }
    }
    span{
        &:first-of-type{
            margin-top: 50px;
        }
        &:last-of-type{
            font-size: 16px;
            margin-top: 10px;
        }
        display: block;
        font-size: 20px;
        font-weight: 600;
        font-family: ${({ theme }) => theme.fontFamily.sub2}, sans-serif;
    }
`;
export default function BattleTags() {
    const navigate = useNavigate();
    const tagList = ["mercy76#3111","SSna#3389"]; 
    // const tagList = [];
    const [battletag, setBattletag] = useState("");
    const handleSave = () => {
        localStorage.setItem("battletag", battletag);
    }
    const handleDelete = () => {};
    const handleSearchTag = (item) => {
        navigate(`/search?battletag=${encodeURIComponent(item)}`);
    };
    return (
        <>
            <Title>내 배틀태그 관리</Title>
            <SaveWrap>
                <input type="text" placeholder="배틀태그 예) 홍길동#1234" value={battletag} onChange={(e) => setBattletag(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSave();
                    }
                }} />
                <button onClick={handleSave}>추가</button>
            </SaveWrap>

            <BattleTagList>
                <p>#배틀태그 리스트</p>
                {
                    tagList.length > 0 ?
                        <ul className="tag-list">
                            {tagList.map((v) => (
                                <li key={v}>
                                    <p onClick={()=>handleSearchTag(v)}>{v}</p>
                                    <button><TiDelete fontSize="25px" color="#ff0000"/></button>
                                </li>
                            ))}
                        </ul> :
                        <span>*배틀태그를 추가하면 더욱 쉽게 관리할 수 있어요.</span>
                }
                 <span>*배틀태그를 클릭하면 검색페이지로 이동합니다!!</span>
                 <span>(PLATFORM - PC , REGION - ASIA 를 기준으로 합니다.)</span>
            </BattleTagList>

        </>
    )
}
