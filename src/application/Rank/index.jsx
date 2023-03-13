import React, { useEffect } from 'react'
import RankList from '../../components/RankList'
import Scroll from "../../components/Scroll"
import Loading from '../../baseUI/Loading'
import { getRankData } from '../../store/features/rankSlice'
import { Container, EnterLoading } from './style'
import { useDispatch, useSelector } from 'react-redux'

export default function Rank() {

  // const { onLoading } =props
  const onLoading = useSelector(store => store.rank.onLoading)
  const rankList = useSelector(store => store.rank.rankList)
  console.log(onLoading)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getRankData())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = onLoading ? {"display":"none"}:  {"display": ""};

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}> 榜单详情 </h1>
          <RankList rankList={rankList}></RankList>
          {/* <h1 className="global" style={displayStyle}> 全球榜 </h1> */}
          { onLoading ? <EnterLoading><Loading></Loading></EnterLoading> : null }
        </div>
      </Scroll> 
      {/* {renderRoutes(props.route.routes)} */}
    </Container>
  )
}
