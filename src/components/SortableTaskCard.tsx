import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import type { Task } from "@/pages/Dashboard";

interface SortableTaskCardProps {
    task: Task;
}

export default function SortableTaskCard({ task }: SortableTaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task._id! });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <TaskCard
                task={task}
                dragHandleProps={{ ...attributes, ...listeners }}
            />
        </div>
    );
}