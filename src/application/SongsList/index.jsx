import React,{ forwardRef, useEffect } from 'react';
import { SongList, SongItem } from "./style";
import { getName } from '../../api/utils';
import { useDispatch } from 'react-redux';
import { changeSequecePlayList, changeCurrentIndex, changePlayList } from '../../store/features/playerSlice'

const SongsList = forwardRef((props, refs)=> {

  const { collectCount, showCollect, songs } = props;

  const dispatch = useDispatch()
  const totalCount = songs.length;


  useEffect(() => {
    dispatch(changeSequecePlayList(songs))
    dispatch(changePlayList(songs))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const selectItem = (e, index) => {
    dispatch(changeCurrentIndex(index))
    // musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
  }

  let songList = (list) => {
    let res = [];
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      res.push (
        <li key={i} onClick={(e) => selectItem (e, i)}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              { item.ar ? getName (item.ar): getName (item.artists) } - { item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      )
    }
    return res;
  };

  const collect = (count) => {
    return  (
      <div className="add_list">
        <i className="iconfont">&#xe62d;</i>
        <span > 收藏 ({Math.floor (count/1000)/10} 万)</span>
      </div>
    )
  };

  return (
    <SongList ref={refs} showBackground={props.showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={(e) => selectItem(e, 0)}>
          <i className="iconfont">&#xe6e3;</i>
          <span > 播放全部 <span className="sum">(共 {totalCount} 首)</span></span>
        </div>
        { showCollect ? collect(collectCount) : null}
      </div>
      <SongItem>
        { songList(songs) }
      </SongItem>
    </SongList>
  )
});

export default SongsList