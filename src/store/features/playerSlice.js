import { createSlice } from "@reduxjs/toolkit";
import { playMode } from "../../api/config";


const playerSlice  = createSlice({
    name:"player",
    initialState:{
        fullScreen: false,// 播放器是否为全屏模式
        playing: false, // 当前歌曲是否播放
        sequencePlayList: {}, // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
        playList: {},
        mode: playMode.sequence,// 播放模式
        currentIndex: -1,// 当前歌曲在播放列表的索引位置
        showPlayList: false,// 是否展示播放列表
        currentSong: {} 
    },
    reducers:{
        changFullScreen(preState){
            if(!preState.fullScreen){
                preState.fullScreen = true
            }else{
                preState.fullScreen = false
            }
        },
        changPlayingState(preState, { payload }){
            preState.playing = payload
        },
        changPlayMode(preState, { payload }){
            preState.mode = payload
        },
        changeCurrentSong(preState, { payload }){
            preState.currentSong = payload
        },
        changeSequecePlayList(preState, { payload }){
            console.log("添加成功")
            preState.sequencePlayList = payload
        },
        changePlayList(preState, { payload }){
            console.log("添加成功")
            preState.playList = payload
        },
        changeShowPlayList(preState, { payload }){

        },
        changeCurrentIndex(preState, { payload }){
            preState.currentIndex = payload
        }
    }
})

export const { changeCurrentIndex, changFullScreen,changeCurrentSong,changPlayMode,changPlayingState,changePlayList,changeSequecePlayList,changeShowPlayList} = playerSlice.actions 

export default playerSlice.reducer