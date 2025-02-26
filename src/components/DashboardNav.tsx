
import {Link} from "react-router";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import useAuthStore from "@/store/authStore.ts";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Button} from "@/components/ui/button.tsx";

const DashboardNav = () => {
    const {currentUser, logout} = useAuthStore();
    return (
        <header
            className="sticky top-0 z-50 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 backdrop-blur-lg dark:border-gray-700">
            <nav className="container mx-auto px-4 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ">
                         <img src=" https://img.icons8.com/?size=100&id=9LCcCoTYXaRk&format=png&color=000000" alt="" />
                        </div>
                        <span
                            className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:text-white">
                            Rian Tasker
                        </span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <div
                            className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/90 px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                            <Avatar className="size-8 shadow-sm border-2 border-white dark:border-gray-800">
                                <AvatarImage
                                    src={currentUser?.photoURL || ""}
                                    alt="user avatar"
                                    className="object-cover w-full h-full rounded-sm"
                                />
                                <AvatarFallback
                                    className="bg-blue-100 text-blue-600 dark:bg-indigo-900 dark:text-indigo-300 font-medium">
                                    {currentUser?.displayName?.[0]?.toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-100">
                                    {currentUser?.displayName || "User"}
                                </p>
                            </div>
                        </div>
                        <ModeToggle/>
                        <Button
                            variant={"destructive"}
                            size="sm"
                            onClick={logout}
                        >
                            <img className="w-7" src="https://img.icons8.com/?size=100&id=K61Xm4cuTBi8&format=png&color=000000"/>
                        </Button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default DashboardNav;