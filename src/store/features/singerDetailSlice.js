import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSingerInfoRequest } from "../../api/request";

export const getSingerDetailData =createAsyncThunk("getSingerDetail",async (id) => {
  const res =  await getSingerInfoRequest(id)
  return res
}) 

const singerDetailList = createSlice({
  name:"singerDetail",
  initialState:{
    singer:{},
    onLoading: true
  },
  reducers:{
    changeState(prestate){
      prestate.singer = {};
      prestate.onLoading = true
    }
  },
  extraReducers(builder){
    builder
    .addCase(getSingerDetailData.pending,state => {
      console.log("loading")
    })
    .addCase(getSingerDetailData.fulfilled,(state, {payload}) => {
      console.log("success")
      state.singer = payload
      state.onLoading = false
    })
    .addCase(getSingerDetailData.rejected,(state, err) => {
      console.log("failed",err)
    })
  }
})

export const { changeState } = singerDetailList.actions

export default singerDetailList.reducer