import { createSlice } from "@reduxjs/toolkit";
import { playMode } from "../../api/config";
import { findIndex } from "../../api/utils";


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
            preState.showPlayList = payload
        },
        changeCurrentIndex(preState, { payload }){
            preState.currentIndex = payload
        },
        deleteSong(preState,{payload}){
            // preState.playList
            // 也可用 loadsh 库的 deepClone 方法。这里深拷贝是基于纯函数的考虑，不对参数 state 做修改
            const playList = JSON.parse(JSON.stringify(preState.playList));
            const sequenceList = JSON.parse(JSON.stringify(preState.sequencePlayList));
            let currentIndex = preState.currentIndex
            // 找对应歌曲在播放列表中的索引
            const fpIndex = findIndex(payload, playList);
            // 在播放列表中将其删除
            playList.splice(fpIndex, 1);
            // 如果删除的歌曲排在当前播放歌曲前面，那么 currentIndex--，让当前的歌正常播放
            if (fpIndex < currentIndex) currentIndex--;
            if (fpIndex === currentIndex){
                preState.currentSong =playList[currentIndex+1]
            } 
            // 在 sequenceList 中直接删除歌曲即可
            const fsIndex = findIndex(payload, sequenceList);
            sequenceList.splice (fsIndex, 1);
            preState.playList = playList
            preState.sequencePlayList = sequenceList
            preState.currentIndex = currentIndex
        },
    }
})

export const { deleteSong, changeCurrentIndex, changFullScreen,changeCurrentSong,changPlayMode,changPlayingState,changePlayList,changeSequecePlayList,changeShowPlayList} = playerSlice.actions 

export default playerSlice.reducer