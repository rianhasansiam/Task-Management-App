import {BrowserRouter, Route, Routes} from "react-router";
import MainLayout from "@/layout/MainLayout.tsx";
import Landing from "@/pages/Landing.tsx";
import Login from "@/pages/Login.tsx";
import {Toaster} from "react-hot-toast";
import ProtectedRoutes from "@/layout/ProtectedRoutes.tsx";
import DashboardLayout from "@/layout/DashboardLayout.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import PublicRoutes from "@/layout/PublicRoutes.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<PublicRoutes/>}>
                        <Route element={<MainLayout/>}>
                            <Route index element={<Landing/>}/>
                        </Route>
                        <Route path={"/login"} element={<Login/>}/>
                    </Route>
                    <Route element={<ProtectedRoutes/>}>
                        <Route element={<DashboardLayout/>}>
                            <Route path={"/dashboard"}>
                                <Route index element={<Dashboard/>}/>
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster position={"top-center"}/>
        </>
    )
}

export default App
