import { Layout } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <Layout className="h-6 w-6" />
                        <span className="text-lg font-bold">TasKit</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                        © 2025 TasKit. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}