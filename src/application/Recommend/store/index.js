import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBannerRequest,getRecommendListRequest } from "../../../api/request"

export const getBannersData = createAsyncThunk("getBannerListRequest", async () => {  // 异步获取banners
  const response = await getBannerRequest()
  return response.banners;
});

export const getRecommendData = createAsyncThunk("getRecommendListRequest", async () => {  // 异步获取recommmends
  const response = await getRecommendListRequest()
  return response.result;
});

export const recommendSlice = createSlice({
  name:"recommend",
  initialState:{
    bannerList: [],
    recommendList: [],
    onLoading: true
  },
  reducers:{
    changeEnterLoading(prestate, { payload }){  // 跟随数据获取的状态修改onLoading
      prestate.onLoading = payload
    }
  },
  extraReducers(builder){  // 异步处理action，action==={payload，err}
    builder
    .addCase(getBannersData.pending,state => {
      console.log("请求处理中。。。。");
    })
    .addCase(getBannersData.fulfilled,(state, {payload}) => {
      console.log("获取成功",payload);
      state.onLoading = false
      state.bannerList = payload
    })
    .addCase(getBannersData.rejected, (state,err) => {
      console.log("获取失败,其原因是",err);
    })

    builder
    .addCase(getRecommendData.pending,state => {
      console.log("请求处理中。。。。");
    })
    .addCase(getRecommendData.fulfilled,(state, { payload }) => {
      console.log("获取成功",payload);
      state.recommendList = payload
    })
    .addCase(getRecommendData.rejected, (state,{ err }) => {
      console.log("获取失败,其原因是",err);
    })
  }

})

export const { changeEnterLoadingAction } = recommendSlice.actions

export default recommendSlice.reducer