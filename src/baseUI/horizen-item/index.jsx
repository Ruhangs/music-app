import React, { useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types'
import Scroll from '../../components/Scroll';
import { List, ListItem } from "./style"

export default function Horizen(props) {

  const { list, oldVal, title } = props;
  const { handleClick } = props;

  // 加入声明
  const Category = useRef(null);

  // 加入初始化内容宽度的逻辑
  useEffect(() => {
    let categoryDOM = Category.current;
    let tagElems = categoryDOM.querySelectorAll ("span");
    let totalWidth = 10;
    Array.from(tagElems).forEach (ele => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction={"horizental"}>
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {
            list.map ((item) => {
              return (
                <ListItem 
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected': ''}`} 
                  onClick={() => handleClick(item.key)}>
                    {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

// 考虑接受的参数
// list 为接受的列表数据
// oldVal 为当前的item值
// title 为列表左边的标题
// handleClick 为点击不同的item执行的方法

Horizen.prototype = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}

Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
}