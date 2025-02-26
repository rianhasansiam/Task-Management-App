import { Layout } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <img className='w-10' src="https://img.icons8.com/?size=100&id=9LCcCoTYXaRk&format=png&color=000000" alt="" />
                        <span className="text-lg font-bold">Rian Tasker</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                        © 2025 Rian Tasker. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}