import { GlobalStyle } from "./style"  //导入全局样式表
import { IconStyle } from './assets/iconfont/iconfont'  // 导入字体图标
import routes from './routes' //引入路由表
import { useRoutes  } from "react-router-dom"; // 引入钩子，根据路由表，动态创建`<Routes>`和`<Route>`


function App() {
  const element = useRoutes(routes)  // 首先要注册组件
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      {/* <NavLink style={{color:"red"}} to='/'>home</NavLink> */}
      {element}
    </div>
  );
}

export default App;
