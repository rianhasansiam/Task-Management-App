import FeatureCard from "@/components/FeatureCard.tsx";
import {CheckSquare, Clock, FlipHorizontal as DragDropHorizontal, Layout, Shield, Smartphone} from "lucide-react";

const Features = () => {
    return (
        <section  id="features">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
                    Powerful Features for Seamless Task Management
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <FeatureCard
                        icon={<DragDropHorizontal />}
                        title="Drag & Drop Interface"
                        description="Effortlessly organize tasks between To-Do, In Progress, and Done categories with our intuitive drag and drop interface."
                    />
                    <FeatureCard
                        icon={<Clock />}
                        title="Real-time Updates"
                        description="Changes sync instantly across all devices, ensuring your team always has the latest information."
                    />
                    <FeatureCard
                        icon={<Shield />}
                        title="Secure Authentication"
                        description="Keep your data safe with our robust authentication system and user-specific task management."
                    />
                    <FeatureCard
                        icon={<CheckSquare />}
                        title="Task Categories"
                        description="Organize tasks into clear categories to maintain a structured workflow and track progress effectively."
                    />
                    <FeatureCard
                        icon={<Smartphone />}
                        title="Mobile Responsive"
                        description="Access and manage your tasks from any device with our fully responsive design."
                    />
                    <FeatureCard
                        icon={<Layout />}
                        title="Clean Interface"
                        description="Focus on what matters with our minimalist, distraction-free user interface design."
                    />
                </div>
            </div>
        </section>
    )
}
export default Features
