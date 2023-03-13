import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSingerListRequest } from "../../api/request";


export const getSingerData = createAsyncThunk("getSingerList",async (props) => {
  console.log(props);
  const {type, area, alpha, count} = props
  const res = await getSingerListRequest(type, area, alpha, count)
  return res.artists
}) 


const singerSlice = createSlice({
  name:"singer",
  initialState:{
    singerList:[],
    onLoading: true,     //控制进场Loading
    pullUpLoading: false,   //控制上拉加载动画
    pullDownLoading: false, //控制下拉加载动画
    pageCount: 0 
  },
  reducers:{
    changePageCount(prestate, { payload }){
      prestate.pageCount = payload
    },
    changePullUpLoading(prestate, { payload }){
      prestate.pullUpLoading = payload
    },
    changePullDownLoading(prestate, { payload }){
      prestate.pullDownLoading = payload
    }
  },
  extraReducers(builder){
    builder
    .addCase(getSingerData.pending, state => {
      console.log("加载中...");
    })
    .addCase(getSingerData.fulfilled,(state,{ payload }) => {
      console.log("加载成功");
      state.onLoading = false
      if(state.singerList === undefined || state.pageCount === 0){  // 刷新
        state.singerList = payload
        state.pullDownLoading = false  // 控制刷新动画消失
      }else{
        state.singerList = [...state.singerList,...payload]
        state.pullUpLoading = false  // 控制动画消失
      }
    })
    .addCase(getSingerData.rejected,(state, err) => {
      console.log("加载失败",err);
    })
  }
})

export const { changePageCount,changePullUpLoading,changePullDownLoading } = singerSlice.actions

export default singerSlice.reducer