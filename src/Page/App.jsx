import { Outlet } from "react-router-dom"
import LandingPage from "../Components/LandinPage"
import { ToastContainer } from "react-toastify"



function App() {


  return (
    <>
  
     <LandingPage></LandingPage>
     <ToastContainer />
     
    </>
  )
}

export default App
