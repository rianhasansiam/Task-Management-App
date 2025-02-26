import {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {
    Edit,
    GripVertical,
    Loader2,
    MoreVertical,
    Trash2,
    Calendar,
    Clock,
} from "lucide-react";
import dayjs from "dayjs";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTask} from "@/api/tasks";
import type {Task} from "@/pages/Dashboard";
import {EditTaskDialog} from "@/components/EditTaskDialog";

interface TaskCardProps {
    task: Task;
    isDragging?: boolean;
    //@typescript-eslint/ no-explicit-any
    dragHandleProps?: Record<string, any>;
}

export default function TaskCard({
                                     task,
                                     isDragging,
                                     dragHandleProps,
                                 }: TaskCardProps) {
    const queryClient = useQueryClient();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const deleteMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tasks"]});
            setIsDeleteDialogOpen(false);
        },
    });

    const handleEdit = () => setIsEditDialogOpen(true);
    const handleDelete = () => deleteMutation.mutate(task._id!);

    return (
        <div
            className={`group relative bg-white dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg transition-all duration-200 border-l-4 ${
                task.category === "To-Do" ? "" :
                    task.category === "In-Progress" ? "" :
                        ""
            } shadow-sm hover:shadow-blue-100/30 dark:hover:shadow-blue-900/20 ${
                isDragging ? "opacity-50" : ""
            }`}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                    <div
                        style={{touchAction : "none"}}
                        {...dragHandleProps}
                        className="mt-1 cursor-grab active:cursor-grabbing group-hover:opacity-100 transition-opacity touch-pan-y"
                    >
                        <GripVertical className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"/>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {task.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {task.description || "No task details provided"}
                        </p>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity"
                        >
                            <MoreVertical className="h-4 w-4"/>
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-[160px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    >
                        <DropdownMenuItem
                            className="text-gray-700 dark:text-gray-300 focus:bg-gray-50 dark:focus:bg-gray-700/50"
                            onSelect={handleEdit}
                        >
                            <Edit className="mr-2 h-4 w-4"/>
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/50"
                            onSelect={() => setIsDeleteDialogOpen(true)}
                        >
                            <Trash2 className="mr-2 h-4 w-4"/>
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded-full">
                    <Calendar className="h-3.5 w-3.5"/>
                    <span>Created {dayjs(task.createdAt).fromNow()}</span>
                </div>
                {task.updatedAt !== task.createdAt && (
                    <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded-full">
                        <Clock className="h-3.5 w-3.5"/>
                        <span>Updated {dayjs(task.updatedAt).fromNow()}</span>
                    </div>
                )}
            </div>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl dark:text-gray-100">
                            Delete Task
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                            This action cannot be undone. This will permanently delete the task "
                            {task.title}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={deleteMutation.isPending}
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white"
                        >
                            {deleteMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin"/>
                            ) : (
                                "Delete"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <EditTaskDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                task={task}
            />
        </div>
    );
}