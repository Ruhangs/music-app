import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react'
import BScroll from "better-scroll"
import PropTypes from "prop-types"
import ScrollContainer from './style'



const Scroll = forwardRef((props,ref) =>  {
    // better-scroll 实例对象
    const [bScroll,setBScroll] = useState()
    // current 指向初始化bs实例需要的DOM元素
    const scrollContainerRef = useRef()

    const { direction, click, refresh,  bounceTop, bounceBottom } = props; // pullUpLoading, pullDownLoading,
    const { pullUp, pullDown, onScroll } = props;   

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
          setBScroll (scroll);
          return () => {
            setBScroll (null);
          }
    },[])

    useEffect (() => {
        if (!bScroll || !pullUp) return;
        bScroll.on ('scrollEnd', () => {
          // 判断是否滑动到了底部
          if (bScroll.y <= bScroll.maxScrollY + 100){
            pullUp ();
          }
        });
        return () => {
          bScroll.off ('scrollEnd');
        }
    }, [pullUp, bScroll]);
    
    useEffect (() => {
        if (!bScroll || !pullDown) return;
        bScroll.on ('touchEnd', (pos) => {
          // 判断用户的下拉动作
          if (pos.y > 50) {
            pullDown ();
          }
        });
        return () => {
          bScroll.off ('touchEnd');
        }
    }, [pullDown, bScroll]);
    
    useEffect (() => {
        if (!bScroll || !onScroll) return;
        bScroll.on ('scroll', (scroll) => {
          onScroll (scroll);
        })
        return () => {
          bScroll.off ('scroll');
        }
    }, [onScroll, bScroll]);

    useEffect (() => {
        if (refresh && bScroll){
          bScroll.refresh ();
        }
    })

    useImperativeHandle (ref, () => ({
        refresh () {
          if (bScroll) {
            bScroll.refresh ();
            bScroll.scrollTo (0, 0);
          }
        },
        getBScroll () {
          if (bScroll) {
            return bScroll;
          }
        }
    }));

    return (
        <ScrollContainer ref={scrollContainerRef}>
            {
                props.children
            }
        </ScrollContainer>
    )
    
})

Scroll.propTypes = {
    direction: PropTypes.oneOf (['vertical', 'horizental']),// 滚动的方向
    click: true,// 是否支持点击
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