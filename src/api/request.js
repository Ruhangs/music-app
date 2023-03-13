import { axiosInstance } from "./config";

// 获取轮播图推荐API
export const getBannerRequest = () => {
  return axiosInstance.get ('/banner');
}

// 获取推荐列表API
export const getRecommendListRequest = () => {
  return axiosInstance.get ('/personalized');
}

// 获取歌手列表
export const getSingerListRequest= (type, area, alpha, count) => {
  return axiosInstance.get(`/artist/list?type=${type}&area=${area}&initial=${alpha.toLowerCase()}&offset=${count*30}`);
}

// 获取排行榜单
export const getRankListRequest = () => {
  return axiosInstance.get (`/toplist/detail`);
};