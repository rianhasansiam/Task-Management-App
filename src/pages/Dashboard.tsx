//@typescript-eslint/ no-explicit-any

import {useState} from "react";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TaskDialog} from "@/components/TaskDialog";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {getUserTasks, updateTask, updateTaskOrder} from "@/api/tasks";
import useAuthStore from "@/store/authStore";
import TaskColumn from "@/components/TaskColumn";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent, TouchSensor,
} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import TaskCard from "@/components/TaskCard";

dayjs.extend(relativeTime);

export interface Task {
    _id?: string;
    title: string;
    description?: string;
    category: "To-Do" | "In-Progress" | "Done";
    order?: number;
    user: string;
    createdAt?: dayjs.Dayjs;
    updatedAt?: dayjs.Dayjs;
}

export default function Dashboard() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const {currentUser} = useAuthStore();
    const queryClient = useQueryClient();


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 0,
                tolerance: 5,
            }
        })
    );

    const {
        data: tasks,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["tasks", currentUser?.email],
        queryFn: () => getUserTasks(currentUser?.email || ""),
        enabled: !!currentUser,
        select: (data) => data?.data,
    });

    const updateTaskMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tasks"]});
        },
    });

    const updateOrderMutation = useMutation({
        mutationFn: updateTaskOrder,
        onSuccess: (response) => {
            queryClient.setQueryData(["tasks", currentUser?.email], (oldData: any) => ({
                ...oldData,
                data: response.data
            }));
        },
    });

    const getSortedTasks = (category: Task["category"]) => {
        return tasks
            ?.filter((task: Task) => task.category === category)
            .sort((a: Task, b: Task) => (a.order || 0) - (b.order || 0)) || [];
    };

    const todoTasks = getSortedTasks("To-Do");
    const inProgressTasks = getSortedTasks("In-Progress");
    const doneTasks = getSortedTasks("Done");

    const handleDragStart = (event: DragStartEvent) => {
        const {active} = event;
        const task = tasks?.find((t: Task) => t._id === active.id);
        if (task) setActiveTask(task);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const {active, over} = event;
        if (!over) return;

        const activeTask = tasks?.find((t: Task) => t._id === active.id);
        if (!activeTask) return;

        const overId = over.id;
        const overCategory = overId === "To-Do" || overId === "In-Progress" || overId === "Done"
            ? overId
            : tasks?.find((t: Task) => t._id === overId)?.category;

        if (overCategory && activeTask.category !== overCategory) {
            const tasksInTargetCategory = getSortedTasks(overCategory);
            const newOrder = tasksInTargetCategory.length;
            queryClient.setQueryData(["tasks", currentUser?.email], (oldData: any) => {
                const updatedTasks = oldData.data.map((t: Task) => {
                    if (t._id === activeTask._id) {
                        return {...t, category: overCategory, order: newOrder};
                    }
                    return t;
                });
                return {...oldData, data: updatedTasks};
            });

            updateTaskMutation.mutate({
                id: activeTask._id!,
                category: overCategory,
                order: newOrder,
            });
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveTask(null);
        const {active, over} = event;
        if (!over) return;

        const activeTask = tasks?.find((t: Task) => t._id === active.id);
        if (!activeTask) return;

        if (active.id !== over.id) {
            const overId = over.id;

            if (overId === "To-Do" || overId === "In-Progress" || overId === "Done") {
                const tasksInTargetCategory = getSortedTasks(overId);
                const newOrder = tasksInTargetCategory.length;
                queryClient.setQueryData(["tasks", currentUser?.email], (oldData: any) => {
                    const updatedTasks = oldData.data.map((t: Task) => {
                        if (t._id === activeTask._id) {
                            return {...t, category: overId, order: newOrder};
                        }
                        return t;
                    });
                    return {...oldData, data: updatedTasks};
                });

                updateTaskMutation.mutate({
                    id: activeTask._id!,
                    category: overId,
                    order: newOrder,
                });
            } else {
                const overTask = tasks?.find((t: Task) => t._id === overId);
                if (!overTask) return;

                const activeItems = getSortedTasks(activeTask.category);
                const oldIndex = activeItems.findIndex((t: Task) => t._id === active.id);
                const newIndex = activeItems.findIndex((t: Task) => t._id === over.id);

                const reorderedItems = arrayMove(activeItems, oldIndex, newIndex);
                queryClient.setQueryData(["tasks", currentUser?.email], (oldData: any) => {
                    const updatedTasks = oldData.data.map((t: Task) => {
                        //@ts-ignore
                        const reorderedItem = reorderedItems.find((ri: Task) => ri._id === t._id);
                        if (reorderedItem) {
                            return {...t, order: reorderedItems.indexOf(reorderedItem)};
                        }
                        return t;
                    });
                    return {...oldData, data: updatedTasks};
                });

                //@ts-ignore
                reorderedItems.forEach((task: Task, index: number) => {
                    if (task.order !== index) {
                        updateOrderMutation.mutate({
                            id: task._id!,
                            category: task.category,
                            order: index
                        });
                    }
                });
            }
        }
    };

    if (isError) {
        return (
            <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="text-center">
                    <p className="text-red-500 mb-2">Error loading tasks</p>
                    <p className="text-gray-600 dark:text-gray-400">
                        {(error as Error).message}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-gray-900">
            <main className="container mx-auto px-4 py-8">
                <Button
                    onClick={() => setIsDialogOpen(true)}
                    size="sm"
                    className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/30 mb-6"
                    disabled={isLoading}
                >
                    <Plus className="h-4 w-4 mr-2"/>
                    Add Task
                </Button>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TaskColumn
                            id="To-Do"
                            title="To-Do"
                            tasks={todoTasks}
                            isLoading={isLoading}
                        />
                        <TaskColumn
                            id="In-Progress"
                            title="In Progress"
                            tasks={inProgressTasks}
                            isLoading={isLoading}
                        />
                        <TaskColumn
                            id="Done"
                            title="Done"
                            tasks={doneTasks}
                            isLoading={isLoading}
                        />
                    </div>
                    <DragOverlay>
                        {activeTask ? <TaskCard task={activeTask} isDragging={true}/> : null}
                    </DragOverlay>
                </DndContext>
            </main>

            <TaskDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
        </div>
    );
}