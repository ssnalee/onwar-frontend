import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../store/counterSlice';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getTest } from '../api/api';
import { useNavigate } from 'react-router-dom';

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
    const { data, error, isLoading ,refetch } = useQuery({
        queryKey : ['test', userNo],
        queryFn: () => getTest(userNo)
    });

    useEffect(()=>{
        refetch();
    },[])
    return (
        <>
            {/* <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={()=> setUserNo(prev=>prev+1)}>data</button> */}
            <p>{}</p>
        </>
    )
}