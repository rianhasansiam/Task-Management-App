import {ChevronRight} from "lucide-react";
import {Link} from "react-router";

const Hero = () => {
    return (
        <section>
            <div className={"container mx-auto px-6 pt-16 pb-24 "}>
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
                        Manage Tasks with
                        <span className="text-indigo-600 dark:text-indigo-400"> Effortless Efficiency</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
                        Transform your workflow with our intuitive task management platform.
                        Drag, drop, and organize your tasks with real-time synchronization
                        across all your devices.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to={"/login"} className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors flex items-center justify-center">
                            Start for Free
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Hero
