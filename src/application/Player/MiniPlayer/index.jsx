import React, { useRef } from 'react'
import { getName } from '../../../api/utils'
import { MiniPlayerContainer } from './style'
import { CSSTransition } from 'react-transition-group';
import ProgressCircle from '../../../baseUI/progress-circle';
import { useDispatch } from 'react-redux';

export default function MiniPlayer(props) {
    const { song, fullScreen, playing, percent } = props;
    const { toggleFullScreen, togglePlayingState, changeShowPlayList } = props
    const miniPlayerRef = useRef();
    const dispatch = useDispatch()


    const toggleShowPlayListState = (e) => {
        dispatch(changeShowPlayList(true))
        e.stopPropagation ();
    }

    return (
        <CSSTransition
            in={!fullScreen} 
            timeout={400} 
            classNames="mini" 
            onEnter={() => {
                miniPlayerRef.current.style.display = "flex";
            }}
            onExited={() => {
                miniPlayerRef.current.style.display = "none";
            }}
        >
            <MiniPlayerContainer ref={miniPlayerRef}>
                <div className="icon" >
                    <div className="imgWrapper"   onClick={toggleFullScreen}>
                    {/* 暂停的时候唱片也停止旋转 */}
                        <img className={`play${playing ? "": "pause"}`} src={song.al.picUrl} width="40" height="40" alt="img"/>
                    </div>
                </div>
                <div className="text">
                    <h2 className="name">{song.name}</h2>
                    <p className="desc">{getName(song.ar)}</p>
                </div>
                <div className="control">
                    <ProgressCircle radius={32} percent={percent}>
                    { playing ? 
                        <i className="icon-mini iconfont icon-pause" onClick={e => togglePlayingState(e, false)}>&#xe650;</i>
                        :
                        <i className="icon-mini iconfont icon-play" onClick={e => togglePlayingState(e, true)}>&#xe61e;</i> 
                    }
                    </ProgressCircle>
                </div>
                <div className="control">
                    <i className="iconfont" onClick={toggleShowPlayListState}>&#xe640;</i>
                </div>
            </MiniPlayerContainer>
        </CSSTransition>
    )
  
}
