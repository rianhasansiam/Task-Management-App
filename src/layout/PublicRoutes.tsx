import useAuthStore from "@/store/authStore.ts";
import { Navigate, Outlet, useLocation } from "react-router";
import FullPageLoader from "@/components/FullPageLoader.tsx";

export default function PublicRoutes() {
    const location = useLocation();
    const { currentUser, authLoading } = useAuthStore();

    const from = location.state?.from?.pathname || "/dashboard";

    if (authLoading) {
        return  <FullPageLoader title={"Checking Auth..."} info={"Hold on, security check!"}/>
    }

    return currentUser ? <Navigate to={from} replace /> : <Outlet />;
}