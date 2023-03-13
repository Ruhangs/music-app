import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRankListRequest } from "../../api/request";


export const getRankData = createAsyncThunk("getRankList",async () => {
  const res = await getRankListRequest()
  return res.list
})

const rankSlice = createSlice({
  name:"rank",
  initialState:{
    rankList:[],
    onLoading: true
  },
  extraReducers(builder){
    builder
    .addCase(getRankData.pending,state => {
      console.log("加载中...");
    })
    .addCase(getRankData.fulfilled,(state, { payload }) => {
      console.log("加载成功")
      state.rankList = payload
      state.onLoading = false
    })
    .addCase(getRankData.rejected, (state, err) => {
      console.log("加载失败",err)
    })
  }
})


export default rankSlice.reducer 