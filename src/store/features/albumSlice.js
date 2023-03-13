import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAlbumDetailRequest } from "../../api/request";


export const getAlnumData = createAsyncThunk("getAlnumList",async (id) => {
  const res = await getAlbumDetailRequest(id);
  return res.playlist
})

const albumSilce = createSlice({
  name: "alnum",
  initialState:{
    currentAlbum:{},
    onLoading: true
  },
  reducers:{
    changeState(prestate){
      prestate.currentAlbum = {};
      prestate.onLoading = true
    }
  },
  extraReducers(builder){
    builder
    .addCase(getAlnumData.pending, state => {
      console.log("加载中...")
    })
    .addCase(getAlnumData.fulfilled, (state, {payload}) => {
      console.log("加载完成")
      state.currentAlbum = payload
      state.onLoading = false
    })
    .addCase(getAlnumData.rejected, (state, err) => {
      console.log("加载失败",err)
    })
  }
})


export const { changeState } = albumSilce.actions

export default albumSilce.reducer