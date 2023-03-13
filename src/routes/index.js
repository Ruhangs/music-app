/* eslint-disable import/no-anonymous-default-export */
import { Navigate } from "react-router"
import Home from "../application/Home"
import Rank from "../application/Rank"
import Recommend from "../application/Recommend"
import Singers from "../application/Singers"
import Album from "../application/Album"
// import Test from "../application/Test"

export default [
  {
    path:"/",
    element:<Home />,
    children:[
      {
        path:"recommend",
        element:<Recommend />,
        children:[
          {
            path:":id",
            element:<Album />
          }
        ]
      },
      {
        path:"singers",
        element:<Singers />,
      },
      {
        path:"rank",
        element:<Rank />,
        children:[
          {
            path:":id",
            element:<Album />
          }
        ]
      },
      {
        path:'/',
        element:<Navigate to='recommend'></Navigate>
      }
    ]
  }
]