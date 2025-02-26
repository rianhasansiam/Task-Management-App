//@typescript-eslint/no-explicit-any

import {Layout} from 'lucide-react';
import useAuthStore from "@/store/authStore.ts";
import toast from "react-hot-toast";
import {Link, useLocation, useNavigate} from "react-router";

export default function Login() {
    const {signInWithGoogle} = useAuthStore();
    const location = useLocation();
    const previousPage = location.state?.from?.pathname || '/dashboard';
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate(previousPage, {replace: true});
            toast.success('Signed in successfully');
        } catch (error: any) {
            toast.error(`Sign in failed: ${error.message}`);
        }
    };


    return (
        <div
            className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
            <div className="container mx-auto px-6 py-4">
                <Link to="/" className="flex items-center space-x-2">
                    <Layout className="h-8 w-8 text-indigo-600 dark:text-indigo-400"/>
                    <span className="text-xl font-bold text-gray-800 dark:text-white">TasKit</span>
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
                    <div className="space-y-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                Welcome to TasKit
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">
                                Organize your tasks efficiently
                            </p>
                        </div>

                        <div className="space-y-6">
                            <button
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center space-x-3 px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <svg className="h-6 w-6" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                <span className="font-medium text-lg">Continue with Google</span>
                            </button>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                By continuing, you agree to our{' '}
                                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}