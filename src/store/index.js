import { configureStore } from "@reduxjs/toolkit";
import recommendSlice from   "./features/recommendSlice"
import singerSlice from "./features/singerSlice";
import rankSlice from "./features/rankSlice";
import albumSlice from "./features/albumSlice";
import singerDetailSlice from "./features/singerDetailSlice";
import playerSlice from "./features/playerSlice";

const store = configureStore({
  reducer:{
    recommend:recommendSlice,
    singer:singerSlice,
    rank:rankSlice,
    album:albumSlice,
    singerDetail:singerDetailSlice,
    player:playerSlice,
  }
})

export default store