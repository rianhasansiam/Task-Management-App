import {Outlet} from "react-router";
import Footer from "@/components/Footer.tsx";
import Navbar from "@/components/Navbar.tsx";

const MainLayout = () => {
    return (
        <div className={"min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200"}>
            <Navbar/>
            <div className={"container mx-auto px-6"}>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}
export default MainLayout
