import {Loader2} from "lucide-react";

interface Props {
    title: string;
    info?: string;
}

export default function FullPageLoader({title, info}: Props) {
    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative animate-spin">
                    <Loader2 className="h-12 w-12 text-blue-600 dark:text-indigo-400"/>
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-indigo-400 dark:to-blue-400 rounded-full opacity-0 animate-ping"/>
                </div>
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                    {title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {info}
                </p>
            </div>
        </div>
    );
}