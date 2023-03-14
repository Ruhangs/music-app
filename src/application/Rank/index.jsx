import React, { useEffect } from 'react'
import RankList from '../../components/RankList'
import Scroll from "../../components/Scroll"
import Loading from '../../baseUI/Loading'
import { getRankData } from '../../store/features/rankSlice'
import { Container, EnterLoading } from './style'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import { getGlobalRank, getOfficialRank } from '../../api/utils'

export default function Rank() {

  const onLoading = useSelector(store => store.rank.onLoading)
  const rankList = useSelector(store => store.rank.rankList)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getRankData())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = onLoading ? {"display":"none"}:  {"display": ""};

  let globalRankList = getGlobalRank(rankList)
  let officialRankList = getOfficialRank(rankList)

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}> 官方榜 </h1>
          <RankList rankList={officialRankList}></RankList>
          <h1 className="global" style={displayStyle}> 全球榜 </h1>
          <RankList rankList={globalRankList} global={true}></RankList>
          { onLoading ? <EnterLoading><Loading></Loading></EnterLoading> : null }
        </div>
      </Scroll> 
      <Outlet></Outlet>
    </Container>
  )
}
