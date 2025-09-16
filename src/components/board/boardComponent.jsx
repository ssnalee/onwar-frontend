import styled from "styled-components";
import Select from 'react-select';
import AlertModal from '@/components/modal/modalAlert';
import ConfirmModal from '@/components/modal/modalConfirm';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { getHashtagList } from "@/api/apiTag";
import { hashtagColor } from "@/utils/hashtag";
import { FaUndo } from "react-icons/fa";
import { deleteBoard, deleteBoardComment, getBoardList, postBoard, postBoardComment } from "@/api/apiPost";
import { formattedDate } from "@/utils/utils";
import { FaCommentDots } from "react-icons/fa6";


// const Title = styled.h3`
//    margin: 50px 0;
//    display: flex;
//    align-items: center;
//    gap: 5px;
//    font-size: 12p5;
//    color:#616161;
//    /* font-weight: 400; */
// `;
const HashtagList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 25px;
  /* border: 1px solid #cccccc;
  background-color: #fff; */
  border-radius: 10px;
  max-width: 1200px;
  margin: 0 auto 25px;
  li{
    padding:10px;
    width: fit-content;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid #206eff;
    color: #206eff;
    background-color: #fff;
    &:hover{
        background-color: #206eff;
        color:#fff;
    }
  }
`;
const HashtagP = styled.p`
    margin-top: 50px;
    margin-bottom: 25px;
    line-height: 1.5rem;
    text-align: center;
`;
const HashtagSearch = styled.div`
  background-color: #fff;
  border: 1px solid #d3d3d3;
  min-height: 50px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding-right: 100px;
  div{
    padding:10px;
    margin: 5px;
    width: fit-content;
    border-radius: 20px;
    border: 1px solid #cfbd1a;
    background-color: #ffe600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  button{
    position: absolute;
    right: 0;
    height: 100%;
    width: 100px;
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.colors.txt};
    color: ${({ theme }) => theme.colors.txt_reverse};
   }
`;
const PostForm = styled.form`
    background-color: #fff;
    border:1px solid #bebebe;
    border-radius: 3px;
    padding: 20px;
    margin-bottom: 50px;
    &.edit-form{
        margin-bottom: 0;
        border-bottom: none;
        .left-area{
            width:100%;
            p{
                margin-top: 0;
            }
        }
        button{
            width: 80px;
            height: 30px;
            box-shadow: 0 4px 5px rgba(148, 148, 148, 0.2);
            &:last-child{
                background-color: #afafaf;
            }
        }
        .date{
            width: auto;
            justify-content: flex-end;
        }
    }
    >div{
        display: flex;
        gap: 10px;
        >div{
            width: 100%;
        }
    }
    input{
            width: 250px;
            border: 1px solid #d3d3d3;
            padding: 8px;
            &:focus{
                border: 1px solid #6b6b6b;
            }
        }
    button{
        width: 100%;
        margin-top: 20px;
        height: 43px;
        background-color: ${props => props.theme.colors.primary};
        font-size: 1rem;
        border-radius:3px;
    }
    p{
        margin-top: 20px;
    }
    
`;
const BoardList = styled.ul``;
const BoardItem = styled.li`
    /* padding: 30px; */
    margin-bottom: 10px;
    box-shadow: 0 4px 5px rgba(148, 148, 148, 0.2);
`;
const BoardPostContainer = styled.div`
    padding: 20px;
    border: 1px solid #ccc;
    border-bottom: none;
    background-color: #fff;
    .board-body-container{
        position: relative;
        >div{
            span{
                margin-right: 5px;
                color:#206eff;
            }
        }
        button{
            position: absolute;
            right: 0;
            bottom: 0;
        }
        .battletag{
            margin-bottom: 20px;
            background-color: #000;
            width: fit-content;
            color:#fff;
            padding: 5px;
            border-radius: 5px;
        }
    }
`;
const BoardCommentContainer = styled.div`
    /* padding: 30px; */
    .comment-container{
        background-color: #deddd5;
        border: 1px solid #ccc;
        border-bottom: none;
        padding: 10px 20px;
    }
    .comment-content-container{
        border-top: 1px solid #ccc;
        padding: 10px 0;
    }
    .comment-post-container{
        height: 60px;
        display: flex;
        align-items: center;
        button{
            background-color: #000;
            color:#fff;
            width: 100px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }
    }
    textarea{
        resize: none;
        width: 100%;
        height: 100%;
        outline: none;
        padding: 5px;
        border: 1px solid #c5c5c5;
        font-family: ${props => props.theme.fontFamily.main};
        &:focus{
            border: 1px solid ${props => props.theme.colors.primary}
        }
    }

`;
const BoardTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .left-area{
        display: flex;
        align-items: center;
        gap: 10px;
        line-height: 1.2rem;
        p:not(.comment){
            color: #ffd000;
        }
        p:nth-child(n+2){
            color:#999;
            font-size: 0.8rem;
        }
    }

    .date{
        display: flex;
        align-items: center;
        gap: 10px;
        color:#999;
        font-size: 0.8rem;
        &.comment{
         
        }
    }
    button{
        padding: 0;
        font-size: 0.8rem;
    }
`;

// const CommentOptions = styled.div``;

// const EditingForm = styled.form`

// `;

export default function BoardComponent({ category }) {
    const queryClient = useQueryClient();

    const [err, setErr] = useState(null);
    const [confirmMsg, setConfirmMsg] = useState(false);
    const [tagNo, setTagNo] = useState(0);
    const [tagItems, setTagItems] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    const [postTags, setPostTags] = useState([]);
    const [battletag, setBattletag] = useState("");
    const [comment, setComment] = useState("");
    const [editingPostId, setEditingPostId] = useState(null);
    const [editBattletag, setEditBattletag] = useState("");
    const [editPostTags, setEditPostTags] = useState([]);
    const [editComment, setEditComment] = useState("");
    const [editItem, setEditItem] = useState("");
    const [postId, setPostId] = useState(null);
    // const [category, setCategory] = useState(1);
    const [commentOpenMap, setCommentOpenMap] = useState({});
    const { data, error } = useQuery({
        queryKey: ['tagNo', tagNo],
        queryFn: () => getHashtagList(tagNo)
    });

    const { data: boardData, error: boardError } = useQuery({
        queryKey: ['category', category],
        queryFn: () => getBoardList(category)
    });

    const isOptionDisabled = (option) =>
        postTags.length >= 5 && !postTags.includes(option.value);

    const filterdBoardData = useMemo(() => {
        if (!boardData?.data) return [];
        return boardData?.data.filter(item =>
           {
            if (!Array.isArray(item.hashtags)) return false;
            if (searchItems.length === 0) return true;
            const hashtagsSet = new Set(item.hashtags);
            console.log('item.hashtags',item.hashtags);
            console.log('hashtagsSet',hashtagsSet);
            return searchItems.every(s => hashtagsSet.has(s.tag));
           });
    },[boardData, searchItems]);

    const postMutation = useMutation({
        mutationFn: postBoard,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['category']);
            setErr(null);
            if (editingPostId) {
                setEditingPostId(null);
                setEditBattletag("");
                setEditPostTags([]);
            } else {
                setBattletag("");
                setPostTags([]);
            }
        },
        onError: (err) => {
            setErr(err?.response?.data?.msg || "게시글 저장 중 오류가 발생했습니다.");
        },
    })
    const deleteMutation = useMutation({
        mutationFn: deleteBoard,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['category']);
            setErr(null);
            setPostId(null);
        },
        onError: (err) => {
            setErr(err?.response?.data?.msg || "게시글 삭제 중 오류가 발생했습니다.");
        },
    });

    const postCommentMutation = useMutation({
        mutationFn: postBoardComment,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['category']);
            setErr(null);
        },
        onError: (err) => {
            setErr(err?.response?.data?.msg || "댓글 저장 중 오류가 발생했습니다.");
        },
    })
    const deleteCommentMutation = useMutation({
        mutationFn: deleteBoardComment,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['category']);
            setErr(null);
        },
        onError: (err) => {
            setErr(err?.response?.data?.msg || "댓글 삭제 중 오류가 발생했습니다.");
        },
    });
    const toggleComment = (postId) => {
        setCommentOpenMap(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };
    useEffect(() => {
        console.log('postTags', postTags);
    }, [postTags])

    const options = useMemo(() => {
        if (!data?.data) return [];
        return data.data.map(item => ({
            value: item.id,
            label: item.tag
        }))
    }, [data]);

    const coloredData = useMemo(() => {
        if (!data?.data) return [];
        return data.data
            .filter(item => !tagItems.some(selected => selected.id === item.id))
            .map(item => ({
                ...item,
                color: hashtagColor[item.id] || "#000"
            }));
    }, [data, tagItems]);

    const handleClickHashtag = (item) => {
        setTagItems(prevItems => {
            if (prevItems.length >= 5) {
                return prevItems;
            }
            const isExist = prevItems.some(i => i.id === item.id);
            if (isExist) return prevItems;
            return [...prevItems, item];
        });
    }

    const handleDelete = (id) => {
        setTagItems(prevItems => prevItems.filter(item => item.id !== id));
    }

    const handleSelectChange = (selected) => {
        if (!selected) return;
        const selectedArray = Array.isArray(selected) ? selected : [selected];
        if (selectedArray.length > 5) {
            return;
        }
        const ids = selectedArray.map(opt => opt.value);
        setPostTags(ids);
    }

    const handleSearch = () => {
        setSearchItems(tagItems);
        console.log('tag',tagItems);
    }

    const handlePostBoard = () => {
        const isNew = !editingPostId;
        const tag = isNew ? battletag : editBattletag;
        const regex = /^[^#]+#\d+$/;
        if (
            (isNew && (!battletag || postTags.length === 0)) ||
            (!isNew && (!editBattletag || editingPostId.length === 0))
        ) {
            return;
        }
        if (!regex.test(tag)) {
            setErr("배틀태그 형식이 올바르지 않습니다.");
            return;
        }
        const params = {
            method: isNew ? 'POST' : 'PUT',
            data: {
                battletag: tag,
                hashtag_list: isNew ? postTags : editPostTags,
                ...(isNew
                    ? { category }
                    : { post_id: editingPostId })
            }
        };
        postMutation.mutate(params);
    }

    const handleEditBoard = (item) => {
        setEditBattletag(item.battletag);
        setEditingPostId(item.post_id);
        const tags = item.hashtags.map((label) => {
            const found = options.find(opt => opt.label === label);
            return found ? found.value : null;
        }).filter(id => id !== null);
        setEditPostTags(tags);
    }

    const handleDeleteConfirm = () => {
        setConfirmMsg(true);
    }

    const handleClose = (key) => {
        if (key === 1) {
            deleteMutation.mutate(postId);
        }
        setConfirmMsg(false);
    };
    // useEffect(() => {
    //     console.log('edit', editItem);
    // }, [editItem])

    return (
        <>
            <HashtagP>태그를 선택하여 검색하면 관련 게시물을 보여드려요. <br /> ※태그는 최대 5개까지 선택 가능합니다.</HashtagP>
            <HashtagSearch>
                {tagItems.map(item => (
                    <div
                        key={item.id}
                    >
                        <p>#{item.tag}</p>
                        <TiDelete onClick={() => handleDelete(item.id)} />
                    </div>
                ))}
                <button onClick={handleSearch}>검색</button>
            </HashtagSearch>
            <HashtagList>
                <li onClick={() => { setTagItems([]) }}><FaUndo /></li>
                {coloredData.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => handleClickHashtag(item)}
                    >
                        #{item.tag}
                    </li>
                ))}
            </HashtagList>
            <PostForm>
                <div>
                    <input
                        type="text"
                        placeholder="배틀태그 입력 예) 홍길동#1234"
                        value={battletag}
                        onChange={(e) => { setBattletag(e.target.value) }}
                    />
                    <Select
                        options={options}
                        isMulti
                        onChange={handleSelectChange}
                        placeholder="해시태그 선택"
                        isOptionDisabled={isOptionDisabled}
                        value={options.filter(opt => postTags.includes(opt.value))}
                    />

                </div>
                <p>＃해시태그는 최소 1개, 최대 5개까지 선택할 수 있습니다.</p>
                <button type="button" onClick={() => handlePostBoard()}>게시글 등록하기</button>
            </PostForm>
            <BoardList>
                {
                    boardError || boardData?.error ?
                        <p>{boardError.data?.msg || '패치 중 에러가 발생하였습니다.'}</p> :

                        filterdBoardData.map((item) => (
                            <BoardItem key={item.post_id}>

                                {
                                    editingPostId === item.post_id ? (
                                        // 수정폼 영역
                                        <PostForm className="edit-form">
                                            <BoardTitleContainer>
                                                <div className="left-area">
                                                    <p>{item.username}</p>
                                                    <p>등록일 : {formattedDate(item.created_at)}</p>
                                                    <p>수정일 : {formattedDate(item.updated_at)}</p>
                                                </div>
                                                <div className="date">
                                                    <button
                                                        type="button"
                                                        onClick={() => { handlePostBoard() }}
                                                    >
                                                        수정 완료
                                                    </button>
                                                    <button type="button" onClick={() => setEditingPostId(null)}>
                                                        수정 취소
                                                    </button>
                                                </div>
                                            </BoardTitleContainer>
                                            <div>
                                                <input
                                                    placeholder="배틀태그 입력 예) 홍길동#1234"
                                                    type="text"
                                                    value={editBattletag}
                                                    onChange={(e) => setEditBattletag(e.target.value)}
                                                />
                                                <Select
                                                    options={options}
                                                    isMulti
                                                    value={options.filter(opt => editPostTags.includes(opt.value))}
                                                    onChange={(selected) => {
                                                        const selectedArray = Array.isArray(selected) ? selected : [selected];
                                                        setEditPostTags(selectedArray.map(opt => opt.value));
                                                    }}
                                                    isOptionDisabled={(option) =>
                                                        editPostTags.length >= 5 && !editPostTags.includes(option.value)
                                                    }
                                                    placeholder="해시태그 선택"
                                                />
                                            </div>
                                        </PostForm>
                                    ) : (
                                        <BoardPostContainer>
                                            <BoardTitleContainer>
                                                <div className="left-area">
                                                    <p>{item.username}</p>
                                                    <p>등록일 : {formattedDate(item.created_at)}</p>
                                                    <p>수정일 : {formattedDate(item.updated_at)}</p>
                                                </div>
                                                <div className="date">
                                                    <button onClick={() => handleEditBoard(item)}>수정</button>
                                                    <button onClick={() => {
                                                        handleDeleteConfirm()
                                                        setPostId(item?.post_id)
                                                    }}>삭제</button>
                                                </div>
                                            </BoardTitleContainer>
                                            <div className="board-body-container">
                                                <p className="battletag">{item.battletag}</p>
                                                <div className="hashtag-list-container">
                                                    {
                                                        item.hashtags && item.hashtags.map((tag) => (
                                                            <span key={tag}>#{tag}</span>
                                                        ))
                                                    }
                                                </div>
                                                <button onClick={() => toggleComment(item.post_id)}>
                                                    댓글 전체 보기 ({item.comments?.length || 0})
                                                </button>
                                            </div>
                                        </BoardPostContainer>
                                    )
                                }
                                <BoardCommentContainer>
                                    {item.comments?.length > 0 && commentOpenMap[item.post_id] &&
                                        item.comments.map((comment) => (
                                            <div key={comment.id} className="comment-container"  >
                                                <BoardTitleContainer>
                                                    <div className="left-area">
                                                        <p className="comment">{comment.username}</p>
                                                        <p>등록일 : {formattedDate(comment.created_at)}</p>
                                                        <p>수정일 : {formattedDate(comment.updated_at)}</p>
                                                    </div>
                                                    <div className="date comment">
                                                        <button>수정</button>
                                                        <button>삭제</button>
                                                    </div>
                                                </BoardTitleContainer>
                                                <div className="comment-content-container">
                                                    <p>{comment.content}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="comment-post-container">
                                        <textarea
                                            placeholder={item.comments?.length > 0 ? "댓글을 작성하세요!" : "댓글의 첫 번째 작성자가 되어보세요!"}
                                            value={comment}
                                            onChange={(e) => { setComment(e.target.value) }}
                                        />
                                        <button><FaCommentDots />댓글쓰기</button>
                                    </div>
                                </BoardCommentContainer>
                            </BoardItem>
                        ))
                }
            </BoardList>
            {
                err &&
                <AlertModal
                    isVisible={err}
                    title="알림"
                    content={err}
                    onCloseDialogHandler={() => setErr(null)}
                />
            }
            {
                confirmMsg &&
                <ConfirmModal
                    isVisible={confirmMsg}
                    title="정말 삭제하시겠습니까?"
                    content="삭제하면 되돌릴 수 없습니다."
                    onCloseDialogHandler={handleClose}
                />
            }
        </>
    )
}