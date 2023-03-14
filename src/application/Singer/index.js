import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Container, ImgWrapper, BgLayer, SongListWrapper, CollectButton } from './style'
import Header from '../../baseUI/Header'
import Scroll from '../../components/Scroll'
import SongsList from '../SongsList'
import { HEADER_HEIGHT } from "../../api/config"
import { useDispatch, useSelector } from 'react-redux'
import { getSingerDetailData,changeState } from '../../store/features/singerDetailSlice'
import { isEmptyObject } from '../../api/utils'
import Loading from '../../baseUI/Loading'

export default function Singer(props) {

  
  const [showStatus, setShowStatus] = useState(true)
  const [title] = useState("歌手详情")
  const navigate = useNavigate()
  const initialHeight = useRef(0);
  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();

  const artist = useSelector(store => store.singerDetail.singer)
  const onLoading = useSelector(store => store.singerDetail.onLoading)

  const id = useParams().id;
  const dispatch = useDispatch()

  //往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  const exit = () => {
    navigate(-1)
  }

  useEffect(() => {
    dispatch(getSingerDetailData(id))
    let h = imageWrapper.current.offsetHeight;
    initialHeight.current = h;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    //把遮罩先放在下面，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`;
    // songScroll.current.refresh();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const setShowStatusFalse = useCallback (() => {
    setShowStatus(false);
    dispatch(changeState())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback(pos => {
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    // 指的是滑动距离占图片高度的百分比
    const percent = Math.abs (newY /height);
    // 处理往下拉的情况，效果：图片放大，按钮跟着偏移
    if (newY > 0) {
      imageDOM.style["transform"] = `scale (${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d (0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    }else if (newY >= minScrollY) { // 往上滑动，但是遮罩还没超过 Header 部分
      layerDOM.style.top = `${height - OFFSET - Math.abs (newY)}px`;
      // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      // 按钮跟着移动且渐渐变透明
      buttonDOM.style["transform"] = `translate3d (0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) { // 往上滑动，但是遮罩超过 Header 部分
      // 往上滑动，但是超过 Header 部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      // 防止溢出的歌单内容遮住 Header
      headerDOM.style.zIndex = 100;
      // 此时图片高度与 Header 一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  },[]) 

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={exit}
    >
      <Container>
        <Header title={title} ref={header} handleClick={setShowStatusFalse}></Header>
        {
          !isEmptyObject(artist) ? 
            <ImgWrapper ref={imageWrapper} bgUrl={artist.artist.picUrl}>
              <div className="filter"></div>
            </ImgWrapper> :
            <ImgWrapper ref={imageWrapper}>
                <div className="filter"></div>
            </ImgWrapper>
        }
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          {
            !isEmptyObject(artist) ? <Scroll ref={songScroll} onScroll={handleScroll}>
              <SongsList 
                songs={artist.hotSongs}
                showCollect={false}
              ></SongsList> 
            </Scroll> : null
          }
        </SongListWrapper> 
        { onLoading ? <Loading></Loading> : null}
      </Container>
    </CSSTransition>
    
  )
}
