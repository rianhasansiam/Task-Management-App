import { createBrowserRouter } from "react-router-dom";
import App from "./Page/App";
import TaskPage from "./Page/TaskPage";
import TaskHome from "./Page/TaskHome";
import TaskAdd from "./Page/TaskAdd";
import ToDo from "./Page/ToDo";
import InProgress from "./Page/InProgress";
import Done from "./Page/Done";
import AllTasks from "./Page/AllTasks";
import Private from "./Page/Private";




const Root = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      
    },
    {
      path: '/taskPage',
      element:<Private><TaskPage></TaskPage></Private> ,
      children:[
        {
          path:'taskHome',
          element:<TaskHome></TaskHome>,
        
            children:[
              {
                path:'alltasks',
                element:<AllTasks></AllTasks>
              },
              {
                path:'todo',
                element:<ToDo></ToDo>
              },
              {
                path:'inprogress',
                element:<InProgress></InProgress>
              }, 
              {
                path:'done',
                element:<Done></Done>
              }
            ]
       
        },
        {
          path:'taskAdd',
          element:<TaskAdd></TaskAdd>
        }
      ]
      
    }
  ]);

  export default Root