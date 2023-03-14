import React from 'react'
import LazyLoad from 'react-lazyload';
import { List,ListItem } from './style';
import { useNavigate } from 'react-router';

export default function SingerList(props) {
  
  const  { singerList } = props 
  const navigate = useNavigate()

  const enterDetail = (id) => {
    navigate(`${id}`,{
      replace:false,
      state:{id}
    })
  }

  return (
    <List>
      {
        singerList.map ((item, index) => {
          return (
            <ListItem key={item.accountId+""+index} onClick={() => enterDetail(item.id)}>
              <div className="img_wrapper">
              <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./singer.png')} alt="music"/>}>
                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
              </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })
      }
    </List>
    )
}