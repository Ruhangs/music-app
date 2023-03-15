import React, { useEffect } from 'react'
import { forceCheck } from 'react-lazyload';
import { useSelector, useDispatch } from 'react-redux';
import { getBannersData,getRecommendData } from '../../store/features/recommendSlice';
import Slider from '../../components/Slider';
import RecommendList from '../../components/RecommendList'
import Scroll from '../../components/Scroll';
import Loading from '../../baseUI/Loading';
import { Content } from './style';
import { Outlet } from 'react-router';

export default function Recommend(props) {
  const { bannerList, recommendList, onLoading } = useSelector(store => store.recommend)
  const { playList } = useSelector(store => store.player)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!bannerList.length){
      dispatch(getBannersData())
    }
    if(!recommendList.length){
      dispatch(getRecommendData())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Content play={playList.length}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList> 
        </div>
      </Scroll>
      {onLoading ? <Loading></Loading> : null}
      {/* 子路由组件显示 */}
      <Outlet></Outlet>  
    </Content>
  )
}
