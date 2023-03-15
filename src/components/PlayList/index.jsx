import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { changeShowPlayList, changeCurrentIndex, changePlayList, changPlayMode, deleteSong, changeSequecePlayList, changeCurrentSong, changPlayingState } from '../../store/features/playerSlice';
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from './style'
import Scroll from '../Scroll'
import Confirm from '../../baseUI/Confirm';
import { prefixStyle, getName, isEmptyObject } from './../../api/utils';
import { playMode } from '../../api/config';

export default function PlayList() {

  const {
    currentIndex,
    currentSong,
    showPlayList,
    playList,
    mode,
    // sequencePlayList
  } = useSelector(store => store.player)

  const playListRef = useRef()
  const listWrapperRef = useRef()
  const confirmRef = useRef ();
  const [isShow,setIsShow] = useState(false);
  const dispatch = useDispatch()

  // console.log(playList)


  const transform = prefixStyle ("transform");

  const onEnterCB = useCallback(() => {
    // 让列表显示
    setIsShow(true);
    // 最开始是隐藏在下面
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`;
  }, [transform]);

  const onEnteringCB = useCallback (() => {
    // 让列表展现
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0, 0, 0)`;
  }, [transform]);

  const onExitingCB = useCallback (() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);

  const onExitedCB = useCallback(() => {
    setIsShow(false);
    listWrapperRef.current.style[transform] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);

  const getCurrentIcon = (item) => {
    // 是不是当前正在播放的歌曲
    const current = currentSong.id === item.id;
    const className = current ? 'icon-play' : '';
    const content = current ? '&#xe6e3;': '';
    return (
      <i className={`current iconfont ${className}`} dangerouslySetInnerHTML={{__html:content}}></i>
    )
  };

  const getPlayMode = () => {
    let content, text;
    if (mode === playMode.sequence) {
      content = "&#xe625;";
      text = "顺序播放";
    } else if (mode === playMode.loop) {
      content = "&#xe653;";
      text = "单曲循环";
    } else {
      content = "&#xe61b;";
      text = "随机播放";
    }
    return (
      <div>
        <i className="iconfont" onClick={(e) => changeMode (e)}  dangerouslySetInnerHTML={{__html: content}}></i>
        <span className="text" onClick={(e) => changeMode (e)}>{text}</span>
      </div>
    )
  };
  const changeMode = (e) => {
    let newMode = (mode + 1) % 3;
    // 具体逻辑比较复杂 后面来实现
  };

  const handleShowClear = () => {
    confirmRef.current.show ();
  } 

  const handleChangeCurrentIndex = (index) => {
    if (currentIndex === index) return;
    dispatch(changeCurrentIndex(index))
  }

  const handleDeleteSong = (e, song) => {
    e.stopPropagation ();
    dispatch(deleteSong(song))
  };

  const handleConfirmClear = () => {
    // 1. 清空两个列表
    dispatch (changePlayList([]));
    dispatch (changeSequecePlayList([]));
    // 2. 初始 currentIndex
    dispatch (changeCurrentIndex(-1));
    // 3. 关闭 PlayList 的显示
    dispatch (changeShowPlayList(false));
    // 4. 将当前歌曲置空
    dispatch (changeCurrentSong({}));
    // 5. 重置播放状态
    dispatch (changPlayingState(false));
  }

  return (
    <CSSTransition 
      in={showPlayList} 
      timeout={300} 
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper 
        ref={playListRef} 
        style={isShow === true ? { display: "block" } : { display: "none" }} 
        onClick={() => dispatch(changeShowPlayList(false))}
      >
        <div className="list_wrapper" ref={listWrapperRef} onClick={e => e.stopPropagation()}>
          <ListHeader>
            <h1 className="title">
              { getPlayMode() }
              <span className="iconfont clear" onClick={handleShowClear}>&#xe63d;</span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll >
              <ListContent>
                {
                   isEmptyObject(playList) ? null : playList.map((item, index) => {
                    return (
                      <li className="item" key={item.id} onClick={() => handleChangeCurrentIndex(index)}>
                        { getCurrentIcon(item) }
                        <span className="text">{item.name} - {getName(item.ar)}</span>
                        <span className="like">
                          <i className="iconfont">&#xe601;</i>
                        </span>
                        <span className="delete" onClick={(e) => handleDeleteSong(e, item)}>
                          <i className="iconfont">&#xe63d;</i>
                        </span>
                      </li>
                    )
                  })
                }
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
        <Confirm 
          ref={confirmRef}
          text={"是否删除全部？"} 
          cancelBtnText={"取消"} 
          confirmBtnText={"确定"} 
          handleConfirm={handleConfirmClear}
        />
      </PlayListWrapper>  
    </CSSTransition>
  )
}
