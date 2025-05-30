import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    userInfo : null,
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUserInfo : (state, action) => {
            if (JSON.stringify(state.userInfo) !== JSON.stringify(action.payload)) {
                state.userInfo = action.payload;
            }
        }
    }
});

//비동기
export const loginUser = createAsyncThunk(
    'user/loginUser',
  async ({ userId, userPw }) => {
    try {
      const response = await axios.post('/api/login', {
        userId,
        userPw,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }
);
// 사용법
//  await dispatch(loginUser({ userId, userPw })).unwrap();

export const { setUserInfo} = userSlice.actions;
export default userSlice.reducer;