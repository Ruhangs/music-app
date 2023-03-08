import React from 'react'
import { SliderContainer } from './style';
import "swiper/css";
import 'swiper/css/pagination';
import { Autoplay, Pagination} from 'swiper'
import { Swiper, SwiperSlide} from 'swiper/react';


export default function Slider(props) {

  const { bannerList } = props;

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          <Swiper
            modules={[Autoplay,Pagination]}  // 使用引入的功能自动播放和分页
            spaceBetween={0}  // 每张图之间的距离
            slidesPerView={1}  // 每页放几张图片
            loop  // 循环播放
            autoplay={{  // 自动播放的设置
              delay:3000,
              disableOnInteraction:false
            }}
            pagination={{el:'.swiper-pagination',clickable:true}}
          >
            {
              bannerList.map ((item,index) => {
                return (
                  <SwiperSlide key={index}>
                    <img src={item.imageUrl} width="100%" height="100%" alt="推荐" />
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
        <div className="swiper-pagination"></div>
      </div> 
    </SliderContainer>
  );
}
