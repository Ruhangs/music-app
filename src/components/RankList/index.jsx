import React from 'react'
import { List, ListItem  } from './style'
import SongList from '../SongList'

export default function RankList(props) {
  const { rankList } = props
  console.log(rankList)

  // const enterDetail = (name) => {
  //   const idx = filterIdx(name);
  //   if(idx === null) {
  //     alert("暂无相关数据");
  //     return;
  //   } 
  // }

  return (
    <List >
      {
      rankList.map((item) => {
        return (
          <ListItem key={item.id} tracks={item.tracks}> {/*onClick={() => enterDetail(item.name)}*/}
            <div className="img_wrapper">
              <img src={item.coverImgUrl} alt=""/>
              <div className="decorate"></div>
              <span className="update_frequecy">{item.updateFrequency}</span>
            </div>
            {item.tracks.length ? <SongList list={item.tracks}></SongList> : null}
          </ListItem>
        )
      })
    } 
    </List>
  )
}
