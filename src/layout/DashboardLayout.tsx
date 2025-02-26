import {Outlet} from "react-router";
import DashboardNav from "@/components/DashboardNav.tsx";

export default function DashboardLayout() {
    return (
        <>
            <DashboardNav/>
            <Outlet/>
        </>
    )
}