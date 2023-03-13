import React, { useEffect } from 'react'
import { forceCheck } from 'react-lazyload';
import { useSelector, useDispatch } from 'react-redux';
import { getBannersData,getRecommendData } from '../../store/features/recommendSlice';
import Slider from '../../components/Slider';
import RecommendList from '../../components/RecommendList'
import Scroll from '../../components/Scroll';
import Loading from '../../baseUI/Loading';
import { Content } from './style';

export default function Recommend() {
  const { bannerList, recommendList, onLoading } = useSelector(store => store.recommend)
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

  //mock 数据
  // const bannerList = [1,2,3,4].map (item => {
  //   return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
  // });

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList> 
        </div>
      </Scroll>
      {onLoading ? <Loading></Loading> : null}
    </Content>
  )
}
