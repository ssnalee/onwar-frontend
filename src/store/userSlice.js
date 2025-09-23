import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    userInfo : null,
    error : null,
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUserInfo : (state, action) => {
            if (JSON.stringify(state.userInfo) !== JSON.stringify(action.payload)) {
                state.userInfo = action.payload;
            }
        },
        setError : (state, action) => {
          state.error = action.payload;
          console.error('에러 발생 : ',state.error);
      }
    },
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(loginUser.fulfilled, (state, action) => {
    //       state.userInfo = action.payload;
    //       state.errorStatus = null;
    //     })
    //     .addCase(loginUser.rejected, (state, action) => {
    //       state.userInfo = null;
    //       state.errorStatus = 401; 
    //     });
    // }
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
//  await dispatch(loginUser({ userId, userPw })).unwrap();

export const { setUserInfo, setError} = userSlice.actions;
export default userSlice.reducer;