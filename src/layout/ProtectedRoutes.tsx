import useAuthStore from "@/store/authStore.ts";
import {Navigate, Outlet, useLocation} from "react-router";
import FullPageLoader from "@/components/FullPageLoader.tsx";

export default function ProtectedRoutes() {
    const location = useLocation();
    const {currentUser, authLoading} = useAuthStore();


    if (authLoading) {
        return <FullPageLoader title={"Authenticating..."} info={"Securing your workspace"}/>
    }


    return currentUser ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>;

}