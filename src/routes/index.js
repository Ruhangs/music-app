/* eslint-disable import/no-anonymous-default-export */
import Home from "../application/Home"
import Rank from "../application/Rank"
import Recommend from "../application/Recommend"
import Singers from "../application/Singers"
// import { Navigate } from "react-router-dom"

export default [
  {
    path:"/",
    element:<Home />,
    children:[
      {
        path:"recommend",
        element:<Recommend />,
      },
      {
        path:"singers",
        element:<Singers />,
      },
      {
        path:"rank",
        element:<Rank />,
      },
    ]
  }
]