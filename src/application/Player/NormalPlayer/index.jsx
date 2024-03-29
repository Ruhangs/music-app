import React, { useEffect, useRef, useState } from 'react'
import {  getName } from "../../../api/utils";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper
} from "./style";
import { CSSTransition } from 'react-transition-group';
import animations from 'create-keyframe-animation'
import { prefixStyle,getTime } from "../../../api/utils";
import ProgressBar from "../../../baseUI/peogressBar";
import { playMode } from '../../../api/config';
import Scroll from "../../../components/Scroll";
import { LyricContainer, LyricWrapper } from "./style";
import { useDispatch } from 'react-redux';

export default function NormalPlayer(props) {

    const { 
        mode, 
        song, 
        fullScreen, 
        playing, 
        duration, 
        currentTime, 
        percent,
        currentLineNum,
        currentPlayingLyric,
        currentLyric 
    } = props

    const { 
        toggleFullScreen, 
        togglePlayingState, 
        onProgressChange,
        handlePrev,
        handleNext,
        changeMode,
        changeShowPlayList
    } = props

    const normalPlayerRef = useRef();
    const cdWrapperRef = useRef();
    const [currentState,setCurrentState] = useState(true);
    const lyricScrollRef = useRef();
    const lyricLineRefs = useRef([]);
    const dispatch = useDispatch()

    const transform = prefixStyle("transform");  // 不同浏览器有不同transform前缀

    const toggleShowPlayListState = (e) => {
        dispatch(changeShowPlayList(true))
        e.stopPropagation ();
    }

    useEffect(() => {
        if (!lyricScrollRef.current) return;
        let bScroll = lyricScrollRef.current.getBScroll ();
        if (currentLineNum > 5) {
          // 保持当前歌词在第 5 条的位置
          let lineEl = lyricLineRefs.current[currentLineNum - 5].current;
          bScroll.scrollToElement(lineEl, 1000);
        } else {
          // 当前歌词行数 <=5, 直接滚动到最顶端
          bScroll.scrollTo(0, 0, 1000);
        }
    }, [currentLineNum]);

    // 计算偏移的辅助函数
    const _getPosAndScale = () => {
        const targetWidth = 40;
        const paddingLeft = 40;
        const paddingBottom = 30;
        const paddingTop = 80;
        const width = window.innerWidth * 0.8;
        const scale = targetWidth /width;
        // 两个圆心的横坐标距离和纵坐标距离
        const x = -(window.innerWidth/ 2 - paddingLeft);
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
        return {
        x,
        y,
        scale
        };
    };

    // 启用帧动画
    const enter = () => {
        normalPlayerRef.current.style.display = "block";
        const { x, y, scale } = _getPosAndScale();// 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移
        let animation = {
        0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
            transform: `translate3d(0, 0, 0) scale(1.1)`
        },
        100: {
            transform: `translate3d(0, 0, 0) scale(1)`
        }
        };
        animations.registerAnimation ({
        name: "move",
        animation,
        presets: {
            duration: 400,
            easing: "linear"
        }
        });
        animations.runAnimation(cdWrapperRef.current, "move");
    };
        
    const afterEnter = () => {
        // 进入后解绑帧动画
        const cdWrapperDom = cdWrapperRef.current;
        animations.unregisterAnimation("move");
        cdWrapperDom.style.animation = "";
    };

    const leave = () => {
        if (!cdWrapperRef.current) return;
        const cdWrapperDom = cdWrapperRef.current;
        cdWrapperDom.style.transition = "all 0.4s";
        const { x, y, scale } = _getPosAndScale();
        cdWrapperDom.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    };
      
    const afterLeave = () => {
        if (!cdWrapperRef.current) return;
        const cdWrapperDom = cdWrapperRef.current;
        cdWrapperDom.style.transition = "";
        cdWrapperDom.style[transform] = "";
        // 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍 
        // 不置为 none 现在全屏播放器页面还是存在
        normalPlayerRef.current.style.display = "none";
    };

    const getPlayMode = () => {
        let content;
        if (mode === playMode.sequence) {
            content = "&#xe625;";
        } else if (mode === playMode.loop) {
            content = "&#xe653;";
        } else {
            content = "&#xe61b;";
        }
        return content;
    };
    
    const toggleCurrentState = () => {
        if (currentState) {
            setCurrentState(false)
        } else {
            setCurrentState(true)
        }
    };

    return (
        <CSSTransition
            classNames="normal"
            in={fullScreen}
            timeout={100}
            mountOnEnter
            onEnter={enter}
            onEntered={afterEnter}
            onExit={leave}
            onExited={afterLeave}
        >
            <NormalPlayerContainer ref={normalPlayerRef}>
                <div className="background">
                    <img
                        src={song.al.picUrl + "?param=300x300"}
                        width="100%"
                        height="100%"
                        alt="歌曲图片"
                    />
                </div>
                <div className="background layer"></div>
                <Top className="top">
                    <div className="back" onClick={toggleFullScreen}>
                        <i className="iconfont icon-back">&#xe662;</i>
                    </div>
                    <h1 className="title">{song.name}</h1>
                    <h1 className="subtitle">{getName(song.ar)}</h1>
                </Top>
                <Middle ref={cdWrapperRef} onClick={toggleCurrentState}>
                    <CSSTransition
                        timeout={400}
                        classNames="fade"
                        in={currentState}
                        // in={false}
                    >
                        <CDWrapper  style={{visibility: currentState ? "visible" : "hidden"}}>
                            <div className="cd">
                                <img
                                className={`image play ${playing ? "" : "pause"}`}
                                src={song.al.picUrl + "?param=400x400"}
                                alt=""
                                />
                            </div>
                            <p className="playing_lyric">{currentPlayingLyric}</p>
                        </CDWrapper>  
                    </CSSTransition>
                    <CSSTransition
                        timeout={400}
                        classNames="fade"
                        in={!currentState}
                    >
                        <LyricContainer>
                            <Scroll ref={lyricScrollRef}>
                                <LyricWrapper
                                style={{visibility: currentState ? "hidden" : "visible" }}
                                className="lyric_wrapper"
                                >
                                {
                                    currentLyric
                                    ? currentLyric.lines.map ((item, index) => {
                                    // 拿到每一行歌词的 DOM 对象，后面滚动歌词需要！ 
                                    lyricLineRefs.current[index] = React.createRef ();
                                    return (
                                        <p
                                        className={`text ${
                                            currentLineNum === index ? "current" : ""
                                        }`}
                                        key={item + index}
                                        ref={lyricLineRefs.current[index]}
                                        >
                                        {item.txt}
                                        </p>
                                    );
                                    })
                                : <p className="text pure"> 纯音乐，请欣赏。</p>}
                                </LyricWrapper>
                            </Scroll>
                        </LyricContainer>
                    </CSSTransition>
                </Middle>
                <Bottom className="bottom">
                    <ProgressWrapper>
                        <span className="time time-l">{getTime(currentTime)}</span>
                        <div className="progress-bar-wrapper">
                            <ProgressBar percent={percent} percentChange={onProgressChange}></ProgressBar>
                        </div>
                        <div className="time time-r">{getTime(duration)}</div>
                    </ProgressWrapper>
                    <Operators>
                        <div className="icon i-left" >
                            <i 
                                className="iconfont" 
                                onClick={changeMode}
                                dangerouslySetInnerHTML={{
                                    __html: getPlayMode()
                                }} 
                            ></i>
                        </div>
                        <div className="icon i-left" >
                            <i className="iconfont" onClick={handlePrev}>&#xe6e1;</i>
                        </div>
                        <div className="icon i-center">
                            <i 
                                className="iconfont"
                                onClick={e => togglePlayingState(e, !playing)}
                                // 解决字体符号读出来是字符串
                                dangerouslySetInnerHTML={{
                                __html: playing ? "&#xe723;" : "&#xe731;"
                                }} 
                            ></i>
                        </div>
                        <div className="icon i-right" >
                            <i className="iconfont" onClick={handleNext}>&#xe718;</i>
                        </div>
                        <div className="icon i-right">
                            <i className="iconfont" onClick={toggleShowPlayListState}>&#xe640;</i>
                        </div>
                    </Operators>
                </Bottom>
            </NormalPlayerContainer>
        </CSSTransition> 
    )
}
