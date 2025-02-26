import React from "react";

export default function FeatureCard({icon, title, description}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-indigo-600 dark:text-indigo-400 mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
        </div>
    );
}