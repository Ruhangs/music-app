import React from 'react'
import { SongListItem } from './style'

export default function SongList(props) {

  const { list } = props
  return (
    <SongListItem>
      {
        list.map ((item, index) => {
          return <li key={index}>{index+1}. {item.first} - {item.second}</li>
        })
      }
    </SongListItem>
  )
}
