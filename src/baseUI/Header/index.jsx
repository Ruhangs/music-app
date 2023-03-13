import React, { forwardRef } from 'react'
import { HeaderContainer } from './style'
import PropTypes from "prop-types"

const Header = forwardRef((props,ref) => {
  const { handleClick, title, isMarquee} = props;

  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>&#xe655;</i>
      {
        // eslint-disable-next-line jsx-a11y/no-distracting-elements
        isMarquee ? <marquee><h1>{title}</h1></marquee>:
        <h1>{title}</h1>
      }
    </HeaderContainer>
  )
})

Header.defaultProps = {
  handleClick: () => {},
  title: "标题",
  isMarquee: false
};

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool
};



export default Header