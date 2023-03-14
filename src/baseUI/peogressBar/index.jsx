import React, {useEffect, useRef, useState } from 'react';
import { ProgressBarWrapper } from './style';
import { prefixStyle } from './../../api/utils';



export default function ProgressBar(props) {
    const progressBar = useRef ();
    const progress = useRef ();
    const progressBtn = useRef ();
    const [touch, setTouch] = useState ({});
    const progressBtnWidth = 16;
    const { percent } = props;
    const transform = prefixStyle('transform');


    // 取出回调函数
    const { percentChange } = props;

    // 简易版
    // useEffect(() => {
    //     const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    //     _offset(barWidth * percent)
    // },[percent])
    //监听percent
    useEffect(() => {
        if(percent >= 0 && percent <= 1 && !touch.initiated) {
            const barWidth = progressBar.current.clientWidth - progressBtnWidth;
            const offsetWidth = percent * barWidth;
            progress.current.style.width = `${offsetWidth}px`;
            progressBtn.current.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
        }
    // eslint-disable-next-line
    }, [percent]);

    const _changePercent = () => {
        const barWidth = progressBar.current.clientWidth - progressBtnWidth;
        const curPercent = progress.current.clientWidth / barWidth;// 新的进度计算
        percentChange(curPercent);// 把新的进度传给回调函数并执行
    }


    // 处理进度条的偏移
    const _offset = (offsetWidth) => {
        progress.current.style.width = `${offsetWidth}px`;
        progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    }
    
    const progressTouchStart = (e) => {
        const startTouch = {};
        startTouch.initiated = true;//initial 为 true 表示滑动动作开始了
        startTouch.startX = e.touches[0].pageX;// 滑动开始时横向坐标
        startTouch.left = progress.current.clientWidth;// 当前 progress 长度
        setTouch(startTouch);
    }
    
    const progressTouchMove = (e) => {
        if (!touch.initiated) return;
        // 滑动距离   
        const deltaX = e.touches[0].pageX - touch.startX;
        const barWidth = progressBar.current.clientWidth - progressBtnWidth; 
        const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
        _offset(offsetWidth);
    }
    
    // 滑动完成
    const progressTouchEnd = (e) => {
        const endTouch = JSON.parse(JSON.stringify(touch));
        endTouch.initiated = false;
        setTouch(endTouch);
        _changePercent (); // 处理回调
    }

    // 绑定点击事件  进度条点击滑动
    const progressClick = (e) => {
        const rect = progressBar.current.getBoundingClientRect();
        const offsetWidth = e.pageX - rect.left;
        _offset(offsetWidth);
        _changePercent();  // 
    };

    return (    
        <ProgressBarWrapper >
            <div className="bar-inner" ref={progressBar} onClick={progressClick}>
                <div className="progress" ref={progress}></div>
                <div className="progress-btn-wrapper" ref={progressBtn}
                    onTouchStart={progressTouchStart}
                    onTouchMove={progressTouchMove}
                    onTouchEnd={progressTouchEnd}
                >
                <div className="progress-btn"></div>
                </div>
            </div>
        </ProgressBarWrapper>
    )
}