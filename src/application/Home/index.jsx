import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Top, Tab, TabItem } from './style'

export default function Home() {
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">App</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="recommend" ><TabItem><span > 推荐 </span></TabItem></NavLink>
        <NavLink to="singers" ><TabItem><span > 歌手 </span></TabItem></NavLink>
        <NavLink to="rank" ><TabItem><span > 排行榜 </span></TabItem></NavLink>
      </Tab>
      <Outlet></Outlet>
    </div>   
  )   
}
