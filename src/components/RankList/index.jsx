import React from 'react'
import { List, ListItem  } from './style'
import SongList from '../SongList'
import { useNavigate } from 'react-router'

export default function RankList(props) {
  const { rankList,global } = props
  const navigate = useNavigate()


  const enterDetail = (id) => {
    navigate(`${id}`,{
      replace:false,
      state:{id}
    })
  }

  return (
    <List globalRank={global}>
      {
      rankList.map((item) => {
        return (
          <ListItem key={item.id} tracks={item.tracks} onClick={() => enterDetail(item.id)}>
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
