import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Loader2 } from "lucide-react";
import SortableTaskCard from "./SortableTaskCard";
import type { Task } from "@/pages/Dashboard";
import { cn } from "@/lib/utils";

interface ColumnProps {
    title: string;
    tasks: Task[];
    isLoading: boolean;
    id: string;
}

const columnColors = {
    "To-Do": "bg-blue-300 dark:bg-blue-900",
    "In-Progress": "bg-orange-300 dark:bg-orange-900",
    "Done": "bg-green-300 dark:bg-green-900"
};

export default function TaskColumn({ title, tasks, isLoading, id }: ColumnProps) {
    const { setNodeRef } = useDroppable({ id });

    if (isLoading) {
        return (
            <div className={cn(
                "rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-gradient-to-b",
                columnColors[id as keyof typeof columnColors]
            )}>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    {title}
                </h2>
                <div className="flex justify-center items-center h-32">
                    <Loader2 className="h-5 w-5 animate-spin text-gray-400 dark:text-gray-500" />
                </div>
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-gradient-to-b shadow-sm",
                columnColors[id as keyof typeof columnColors]
            )}
        >
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5 px-2 py-1 bg-white dark:bg-gray-700/50 rounded-full inline-block border dark:border-gray-600">
                        {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                    </p>
                </div>
            </div>
            <SortableContext
                items={tasks.map((t) => t._id!)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-3">
                    {tasks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-6 px-4 text-center bg-white/50 dark:bg-gray-700/20 rounded-lg border border-dashed border-gray-200 dark:border-gray-600">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                No tasks here yet
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Drag tasks here or create new ones
                            </p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <SortableTaskCard key={task._id} task={task} />
                        ))
                    )}
                </div>
            </SortableContext>
        </div>
    );
}