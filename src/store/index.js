import { configureStore } from "@reduxjs/toolkit";
import recommendSlice from   "./features/recommendSlice"
import singerSlice from "./features/singerSlice";
import rankSlice from "./features/rankSlice";

const store = configureStore({
  reducer:{
    recommend:recommendSlice,
    singer:singerSlice,
    rank:rankSlice
  }
})

export default store