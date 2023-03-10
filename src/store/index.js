import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from   "../application/Recommend/store/index"
import singerReducer from "../application/Singers/store/index"

const store = configureStore({
  reducer:{
    recommend:recommendReducer,
    singer:singerReducer
  }
})

export default store