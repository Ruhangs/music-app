import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Horizen from '../../baseUI/horizen-item'
import SingerList from '../../components/SingerList'
import Scroll from '../../components/Scroll'
import Loading from "../../baseUI/Loading"
import { forceCheck } from "react-lazyload"
import { getSingerData, changePageCount, changePullDownLoading, changePullUpLoading } from '../../store/features/singerSlice';
import { ListContainer } from './style' 
import { typeTypes, areaTypes, alphaTypes } from '../../api/config'
import { NavContainer } from './style'

export default function Singers() {

  
  let [type, setType] = useState(sessionStorage.getItem('myType') || '-1');
  let [area, setArea] = useState(sessionStorage.getItem('myArea') || '-1');
  let [alpha, setAlpha] = useState(sessionStorage.getItem('myAlpha') || '');
  let [count, setCount] = useState('')

  const singerList  = useSelector(store => store.singer.singerList)
  const onLoading  = useSelector(store => store.singer.onLoading)
  const pullUpLoading  = useSelector(store => store.singer.pullUpLoading)
  const pullDownLoading  = useSelector(store => store.singer.pullDownLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    if(!singerList.length){
      setCount(0)
      dispatch(changePageCount(count))
      dispatch(getSingerData({type,area,alpha,count}))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  let handleUpdateAlpha = (alpha) => {
    sessionStorage.setItem('myAlpha',alpha)
    setCount(0)
    setAlpha(alpha);
    dispatch(changePageCount(count))
    dispatch(getSingerData({type,area,alpha,count}))
  }

  let handleUpdateType = (type) => {
    sessionStorage.setItem('myType',type)
    setType(type);
    setCount(0)
    dispatch(changePageCount(count))
    dispatch(getSingerData({type,area,alpha,count}))
  }

  let handleUpdateArea = (area) => {
    sessionStorage.setItem('myArea',area)
    setCount(0)
    setArea(area);
    dispatch(changePageCount(count))
    dispatch(getSingerData({type,area,alpha,count}))
  }

  const handlePullUp = () => {
    setCount(++count)
    dispatch(changePullUpLoading(true))
    dispatch(getSingerData({type,area,alpha,count}))
    dispatch(changePageCount(count))
  };
  
  const handlePullDown = () => {
    count = 0
    setCount(count)
    dispatch(changePullDownLoading(true))
    dispatch(getSingerData({type,area,alpha,count}))
    dispatch(changePageCount(count))
  };


  return (
    <>
      <NavContainer>
        <Horizen 
          list={typeTypes} 
          // title={"类型:"} 
          handleClick={handleUpdateType} 
          oldVal={type}
        ></Horizen>
        <Horizen 
          list={areaTypes} 
          // title={"地区:"} 
          handleClick={handleUpdateArea} 
          oldVal={area}
        ></Horizen>
        <Horizen 
          list={alphaTypes} 
          // title={"首字母:"} 
          handleClick={handleUpdateAlpha} 
          oldVal={alpha}
        ></Horizen>
      </NavContainer>
      <ListContainer>
      
        <Scroll 
          pullUp={ handlePullUp }
          pullDown = { handlePullDown }
          pullUpLoading = { pullUpLoading }
          pullDownLoading = { pullDownLoading } 
          onScroll={forceCheck}
        >
          <SingerList singerList={singerList}></SingerList>
        </Scroll>
      </ListContainer> 
      { onLoading ? <Loading ></Loading> : null}
    </>
  )
}
