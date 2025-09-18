import { useEffect, useState } from "react";
import styled from "styled-components";
import AlertModal from '@/components/modal/modalAlert';
import { TiDelete } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBattletagList, patchBattletag, postBattletag } from "../api/apiTag";
import { deleteBattletag } from '@/api/apiTag';
import ModalFrame from "@/components/modal/modalFrame";
import Spinner from "@/components/Spinner"
const SaveWrap = styled.div`
    margin-top: 50px;
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
    >h5{
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
            family: ${({ theme }) => theme.fontFamily.sub2}, sans-serif;
            font-weight: 600;
            p{
                cursor: pointer;
            }
            button{
                display: flex;
                padding: 0;
                margin-left: 5px;
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
        line-height: 30px;
        font-size: 20px;
        font-weight: 600;
        font-family: ${({ theme }) => theme.fontFamily.sub2}, sans-serif;
    }
`;


const ModalTitle = styled.div`
  padding: 16px 20px 0;
  font-weight: bold;
  h4 {
    margin: 0;
    font-size: 18px;
    /* text-align: center; */
    /* color:#fff; */
    font-family: ${({ theme }) => theme.fontFamily.main}, sans-serif;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  font-size: 15px;
  line-height: 1.5;
  /* text-align: center; */
  input{
    border: 1px solid #ffca00;
    &.error{
        border: 1px solid #ff0000;
    }
  }
`;

const ModalButtonWrap = styled.div`
  padding: 0 20px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  button {
    padding: 8px 14px;
    font-size: 14px;
    background: #222;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:last-child {
      background: #aaa;
    }
  }
`;

export default function BattleTags() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [err, setErr] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editInput, setEditInput] = useState(null);
    const { data: tagList, isLoading, error } = useQuery({
        queryKey: ['tagList'],
        queryFn: () => getBattletagList()
    });
    const [battletag, setBattletag] = useState("");
    const saveMutation = useMutation({
        mutationFn: postBattletag,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['tagList']);
            setBattletag('');
            setErr(null);
        },
        onError: (err) => {
            setErr(err?.response?.data?.msg || "배틀태그 저장 중 오류가 발생했습니다.");
        },
    });
    const updateMutation = useMutation({
        mutationFn: patchBattletag,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['tagList']);
            setBattletag('');
            setErr(null);
            setEditingId(null);
        },
        onError: (err) => {
            setErr(err?.response?.data?.msg || "배틀태그 업데이트 중 오류가 발생했습니다.");
        },
    });
    const deleteMutation = useMutation({
        mutationFn: deleteBattletag,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['tagList']);
            setBattletag('');
            setErr(null);
        },
        onError: (err) => {
            setErr(err?.response?.data?.msg || "배틀태그 삭제 중 오류가 발생했습니다.");
        },
    });
    const handleSave = () => {
        if (!battletag.trim()) {
            setErr('배틀태그를 입력해주세요.');
            return;
        }
        saveMutation.mutate(battletag);
    }
    const handleClickEdit = (v) => {
        setEditingId(v.id);
        setEditInput(v.battletag);
    }
    const handleDeleteTag = (id) => {
        deleteMutation.mutate(id);
    };
    const handleSearchTag = (item) => {
        navigate(`/search?battletag=${encodeURIComponent(item)}`);
    };
    const closeHandler = (key) => {
        if (key === 1 && editingId) {
            updateMutation.mutate({ id: editingId, tag: editInput });
        } else {
            setEditingId(null);
        }
    };
    const onCloseDialogHandler = () => {
        setErr(null);
    }
    return (
        <>
            <SaveWrap>
                <input type="text" placeholder="배틀태그 예) 홍길동#1234" value={battletag} onChange={(e) => setBattletag(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSave();
                    }
                }} />
                <button onClick={handleSave}>추가</button>
            </SaveWrap>
            <BattleTagList>
                <h5>#배틀태그 리스트</h5>
                {
                    isLoading ? (<Spinner str={true} />) :
                        error || tagList?.error ?
                            (<p>{tagList?.msg || '리스트를 불러오는데 오류가 발생하였습니다.'}</p>) :
                            tagList?.data?.length > 0 ?
                                (<ul className="tag-list">
                                    {tagList?.data?.map((v) => (
                                        <li key={v.battletag}>
                                            <p onClick={() => handleSearchTag(v.battletag)}>{v.battletag}</p>
                                            <button onClick={() => handleClickEdit(v)}><FaEdit fontSize="25px" color="#000" /></button>
                                            <button onClick={() => handleDeleteTag(v.id)}><TiDelete fontSize="25px" color="#ff0000" /></button>
                                        </li>
                                    ))}
                                </ul>) :
                                (<>
                                    <span>저장된 배틀태그가 없습니다. <br />배틀태그를 추가하면 더욱 쉽게 관리할 수 있어요.</span>
                                    <br />
                                    <br />
                                    <br />
                                </>)
                }

                <span>*배틀태그를 클릭하면 검색페이지로 이동합니다!!</span>
                <span>(PLATFORM - PC , REGION - ASIA 를 기준으로 합니다.)</span>

            </BattleTagList>
            {
                editingId !== null ?
                    <ModalFrame
                        isVisible={editingId}
                        // width={width}
                        // height={height}
                        // maxWidth={maxWidth}
                        isOverlay={true}
                        onCloseDialogHandler={() => closeHandler(0)}
                    >
                        <ModalTitle>
                            <h4>배틀태그 수정</h4>
                        </ModalTitle>

                        <ModalBody>
                            <input type="text" value={editInput} onChange={(e) => { setEditInput(e.target.value) }} />
                        </ModalBody>

                        <ModalButtonWrap>
                            <button onClick={() => closeHandler(1)}>확인</button>
                            <button onClick={() => closeHandler(0)}>취소</button>
                        </ModalButtonWrap>
                    </ModalFrame>
                    : null
            }
            {
                err &&
                <AlertModal
                    isVisible={err}
                    title="알림"
                    content={err}
                    onCloseDialogHandler={onCloseDialogHandler}
                />
            }
        </>
    )
}
