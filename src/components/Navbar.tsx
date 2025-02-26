import {Layout} from 'lucide-react';
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Link} from "react-router";


export default function Navbar() {
    return (
        <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img className='w-16' src="https://img.icons8.com/?size=100&id=9LCcCoTYXaRk&format=png&color=000000" alt="" />
                    <span className="text-xl font-bold text-gray-800 dark:text-white">Rian Takser</span>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                </div>

                <div className={"flex justify-center items-center gap-4"}>
                    <ModeToggle/>

                    <Link to={"/login"}
                          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors">
                        Get Started
                    </Link>
                </div>
            </div>

        </nav>
    );
}