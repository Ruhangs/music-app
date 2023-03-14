import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    changFullScreen,
    changeCurrentSong,
    changPlayMode,
    changPlayingState,
    changeCurrentIndex,
    changePlayList,
    // changeSequecePlayList,
    // changeShowPlayList 
} from '../../store/features/playerSlice'
import MiniPlayer from './MiniPlayer'
import NormalPlayer from './NormalPlayer'
import { getSongUrl,isEmptyObject, shuffle, findIndex } from '../../api/utils'
import { playMode } from '../../api/config'

export default function Player() {

  const dispatch = useDispatch()
  //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
  const [preSong, setPreSong] = useState({});
  const fullScreen = useSelector(store => store.player.fullScreen)
  const playing = useSelector(store => store.player.playing)
  const currentIndex = useSelector(store => store.player.currentIndex)
  const currentSong = useSelector(store => store.player.currentSong)
  const mode = useSelector(store => store.player.mode)
  const playList = useSelector(store => store.player.playList)
  const sequencePlayList = useSelector(store => store.player.sequencePlayList)

  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  // 播放插件
  const audioRef = useRef();

  useEffect(() => {
    console.log(playList.length,currentIndex,playList[currentIndex],preSong.id)
    if (
      !playList.length ||  // 没有歌曲
      currentIndex === -1 || // 索引为负值
      !playList[currentIndex] || // 歌曲列表中没有内容
      playList[currentIndex].id === preSong.id  // 当前歌曲与之前歌曲一直
    ) return;
    let current = playList[currentIndex];
    dispatch(changeCurrentSong(current));//赋值currentSong
    setPreSong(current)  // 记录当前歌曲
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current.play();
    });
    dispatch(changPlayingState(true));//播放状态
    setCurrentTime(0);//从头开始播放
    setDuration((current.dt / 1000) | 0);//时长
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex,preSong]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [currentIndex,playing]);

  const toggleFullScreen = useCallback(() => {
    dispatch(changFullScreen())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const togglePlayingState = useCallback((e, state) => {
    e.stopPropagation();
    dispatch(changPlayingState(state))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const updateTime = e => {
    setCurrentTime(e.target.currentTime);
  };

  const onProgressChange = curPercent => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      dispatch(changPlayingState(true))
    }
  };

  //一首歌循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    dispatch(changPlayingState(true))
    audioRef.current.play();
  };

  const handlePrev = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) dispatch(changPlayingState(true));
    dispatch(changeCurrentIndex(index));
  };

  const handleNext = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) dispatch(changPlayingState(true));
    dispatch(changeCurrentIndex(index));
  };

  const changeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      //顺序模式
      dispatch(changePlayList(sequencePlayList))
      // changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      dispatch(changeCurrentIndex(index))
      // changeCurrentIndexDispatch(index);
    } else if (newMode === 1) {
      //单曲循环
      dispatch(changePlayList(sequencePlayList))
      // changePlayListDispatch(sequencePlayList);
    } else if (newMode === 2) {
      //随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      dispatch(changePlayList(newList))
      dispatch(changeCurrentIndex(index))

      // changePlayListDispatch(newList);
      // changeCurrentIndexDispatch(index);
    }
    dispatch(changPlayMode(newMode))
  };

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  }

  return (
    <div>
      { isEmptyObject(currentSong) ? null : 
        <MiniPlayer 
          percent={percent}
          song={currentSong} 
          playing={playing}
          currentIndex={currentIndex}
          fullScreen={fullScreen} 
          toggleFullScreen={toggleFullScreen}
          togglePlayingState={togglePlayingState}
        ></MiniPlayer> 
      }
      { isEmptyObject(currentSong) ? null : 
        <NormalPlayer 
          percent={percent}// j进度
          duration={duration}//总时长
          currentTime={currentTime}//播放时间
          song={currentSong} 
          playing={playing}
          mode={mode}
          currentIndex={currentIndex}
          fullScreen={fullScreen} 
          toggleFullScreen={toggleFullScreen}
          togglePlayingState={togglePlayingState}
          onProgressChange={onProgressChange}
          handlePrev={handlePrev}
          handleNext={handleNext}
          changeMode={changeMode}
        ></NormalPlayer>
      }
      <audio 
        ref={audioRef} 
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
      ></audio>
    </div>
  )
}
