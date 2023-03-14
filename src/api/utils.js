// import { RankTypes } from "./config"

export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor (count / 10000) < 10000) {
    return Math.floor (count/1000)/10 + "万";
  } else  {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}

// 防抖函数
export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout (() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  }
}

// 处理歌手列表拼接歌手名字
export const getName = list => {
  let str = "";
  list.map ((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

// 判断一个对象是否为空
export const isEmptyObject = obj => !obj || Object.keys (obj).length === 0;

//处理数据，找出第一个没有歌名的排行榜的索引
export const getGlobalRank = rankList => {
  let globalRankList = []
  for (let i = 0; i < rankList.length - 1; i++) {
    if (!rankList[i].tracks.length) {
      globalRankList.push(rankList[i])
    }
  }
  return globalRankList
};

export const getOfficialRank = rankList => {
  let officialRankList = []
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length) {
      officialRankList.push(rankList[i])
    }
  }
  return officialRankList
};

let elementStyle = document.createElement ("div").style;

let vendor = (() => {
  // 首先通过 transition 属性判断是何种浏览器
  let transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransfrom",
    ms: "msTransform",
    standard: "Transform"
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle (style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === "standard") {
    return style;
  }
  return vendor + style.charAt (0).toUpperCase () + style.substr (1);
}

// //找出排行榜的编号
// export const filterIdx = name => {
//   for (var key in RankTypes) {
//     if (RankTypes[key] === name) return key;
//   }
//   return null;
// };

//拼接出歌曲的url链接
export const getSongUrl = id => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

export const getTime = time => {
  time = Math.floor(time)
  let miuntes = Math.floor(time / 60) 
  let seconds = (time % 60).toString().padStart(2, "0") // 补零
  let timeStr = `${miuntes}:${seconds}`
  return timeStr
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// 随机算法
export function shuffle(arr) {
  let new_arr = [];
  arr.forEach(item => {
    new_arr.push(item);
  });
  for (let i = 0; i < new_arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }
  return new_arr;
}

// 找到当前的歌曲索引
export const findIndex = (song, list) => {
  return list.findIndex(item => {
    return song.id === item.id;
  });
};