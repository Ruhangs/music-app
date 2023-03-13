import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react'
import Loading2 from '../../baseUI/Loading/loading-v2';
import Loading from '../../baseUI/Loading';
import { debounce } from '../../api/utils';
import { useMemo } from 'react';
import BScroll from "better-scroll"
import PropTypes from "prop-types"
import {ScrollContainer, PullDownLoading, PullUpLoading} from './style'



const Scroll = forwardRef((props,ref) =>  {
  // better-scroll 实例对象
  const [bScroll,setBScroll] = useState()
  // current 指向初始化bs实例需要的DOM元素
  const scrollContainerRef = useRef()

  const { direction, click, refresh,  bounceTop, bounceBottom, pullUpLoading, pullDownLoading } = props; // ,
  const { pullUp, pullDown, onScroll } = props;   

  // 创建实例
  useEffect(() => {
    const scroll = new BScroll (scrollContainerRef.current, {
        scrollX: direction === "horizental",
        scrollY: direction === "vertical",
        probeType: 3, // 可能会有性能问题 probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
        click: click, // BetterScroll 默认会阻止浏览器的原生 click 事件。当设置为 true，BetterScroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
        bounce:{  //当滚动超过边缘的时候会有一小段回弹动画。设置为 true 则开启动画。
          top: bounceTop,
          bottom: bounceBottom
        }
      });
      setBScroll(scroll);
      return () => {
        setBScroll(null);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    

  // 给实例绑定 scroll 事件
  useEffect (() => {
      if (!bScroll || !onScroll) return;
      bScroll.on ('scroll', (scroll) => {
        onScroll(scroll);
      })
      return () => {
        bScroll.off('scroll');
      }
  }, [onScroll, bScroll]);

  

  let pullUpDebounce = useMemo (() => {
    return debounce (pullUp, 1000)
  }, [pullUp]);
  // 千万注意，这里不能省略依赖，
  // 不然拿到的始终是第一次 pullUp 函数的引用，相应的闭包作用域变量都是第一次的，产生闭包陷阱。下同。
  
  let pullDownDebounce = useMemo (() => {
    return debounce (pullDown, 1000)
  }, [pullDown]);
  //...
  // 之后直接调用 useMemo 返回的函数
  // 滑动到底部
  useEffect(() => {
      if(!bScroll || !pullUp) return;
      const handlePullUp = () => {
        //判断是否滑动到了底部
        if(bScroll.y <= bScroll.maxScrollY + 100){
          pullUpDebounce();
        }
      };
      bScroll.on('scrollEnd', handlePullUp);
      // 解绑
      return () => {
        bScroll.off('scrollEnd', handlePullUp);
      }
  }, [pullUp, pullUpDebounce, bScroll]);
  
  // 判断用户的下拉动作
  useEffect(() => {
      if(!bScroll || !pullDown) return;
      const handlePullDown = (pos) => {
        //判断用户的下拉动作
        if(pos.y > 50) {
          pullDownDebounce();
        }
      };
      bScroll.on('touchEnd', handlePullDown);
      return () => {
        bScroll.off('touchEnd', handlePullDown);
      }
  }, [pullDown, pullDownDebounce, bScroll]);

  //每次重新渲染都要刷新实例，防止无法滑动
  useEffect (() => {
    if (refresh && bScroll){
      bScroll.refresh ();
    }
  })

  // 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
  useImperativeHandle (ref, () => ({
    // 给外界暴露 refresh 方法
    refresh () {
      if (bScroll) {
        bScroll.refresh ();
        bScroll.scrollTo (0, 0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll () {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  const PullUpdisplayStyle = pullUpLoading ? {display: ""} : { display:"none" };
  const PullDowndisplayStyle = pullDownLoading ? { display: ""} : { display:"none" };

  return (
      <ScrollContainer ref={scrollContainerRef}>
          {
              props.children
          }
          {/* 滑到底部加载动画 */}
          <PullUpLoading style={ PullUpdisplayStyle }><Loading></Loading></PullUpLoading>
          {/* 顶部下拉刷新动画 */}
          <PullDownLoading style={ PullDowndisplayStyle }><Loading2></Loading2></PullDownLoading>
      </ScrollContainer>
  )
})

Scroll.propTypes = {
    direction: PropTypes.oneOf (['vertical', 'horizental']),// 滚动的方向
    click: PropTypes.bool,// 是否支持点击
    refresh: PropTypes.bool,// 是否刷新
    onScroll: PropTypes.func,// 滑动触发的回调函数
    pullUp: PropTypes.func,// 上拉加载逻辑
    pullDown: PropTypes.func,// 下拉加载逻辑
    pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
    pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
    bounceTop: PropTypes.bool,// 是否支持向上吸顶
    bounceBottom: PropTypes.bool// 是否支持向下吸底
};

Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll:null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
};

export default Scroll