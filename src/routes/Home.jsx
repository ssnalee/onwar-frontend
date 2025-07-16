import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../store/counterSlice';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getTest } from '../api/api';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/modal/modalConfirm';

export default function Home() {
    const count = useSelector((state) => state.counter.value);
    const [userNo, setUserNo] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // dispatch(setTodos(newTodosArray));
    // const { data, error, isLoading ,refetch } = useQuery({
    //     queryKey: ['test'],
    //     queryFn: getTest
    // });
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['test', userNo],
        queryFn: () => getTest(userNo)
    });


    const [visible, setVisible] = useState(true);

    const handleClose = (key) => {
        if (key === 1) {
            alert('확인 눌림');
        } else {
            alert('취소 눌림');
        }
        setVisible(false);
    };

    useEffect(() => {
        refetch();
    }, [])
    return (
        <>
            {/* <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={()=> setUserNo(prev=>prev+1)}>data</button> */}
            <p>{ }</p>

            <ConfirmModal
                isVisible={visible}
                title="정말 삭제하시겠습니까?"
                content="삭제하면 되돌릴 수 없습니다."
                onCloseDialogHandler={handleClose}
            />
        </>
    )
}