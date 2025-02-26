import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {updateTask} from "@/api/tasks.ts"

const taskSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1).max(50, "Title must be less than 50 characters"),
    description: z.string().max(200, "Description must be less than 200 characters").optional(),
    category: z.enum(["To-Do", "In-Progress", "Done"]),
})

type TaskFormValues = z.infer<typeof taskSchema>

export interface UpdateTask {
    _id?: string
    title: string
    description?: string
    category: "To-Do" | "In-Progress" | "Done"
}

interface EditTaskDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    task: UpdateTask
}


export function EditTaskDialog({open, onOpenChange, task}: EditTaskDialogProps) {
    const queryClient = useQueryClient()

    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            id: task._id,
            title: task.title || "",
            description: task.description || "",
            category: task.category || "",
        },
    })

    const mutation = useMutation({
        mutationFn: updateTask,
        onError: () => {
            toast.error("Failed to update task. Please try again.");
        },
        onSuccess: () => {
            toast.success("Task updated successfully!");
            queryClient.invalidateQueries({queryKey: ["tasks"]});
            onOpenChange(false);
        },
    });

    const onSubmit = (data: TaskFormValues) => {
        mutation.mutate({id: task._id!, ...data});
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">Edit Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
                            Title
                        </Label>
                        <Input
                            id="title"
                            {...form.register("title")}
                            placeholder="Enter task title"
                            className="border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                        />
                        {form.formState.errors.title && (
                            <p className="text-sm text-red-500 dark:text-red-400">{form.formState.errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            {...form.register("description")}
                            placeholder="Enter task description"
                            className="border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 min-h-[100px]"
                        />
                        {form.formState.errors.description && (
                            <p className="text-sm text-red-500 dark:text-red-400">{form.formState.errors.description.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">
                            Category
                        </Label>
                        <Select
                            defaultValue={form.getValues("category")}
                            onValueChange={(value) => form.setValue("category", value as "To-Do" | "In-Progress" | "Done")}
                        >
                            <SelectTrigger
                                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                <SelectValue placeholder="Select a category"/>
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                                <SelectItem
                                    value="To-Do"
                                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    TO DO
                                </SelectItem>
                                <SelectItem
                                    value="In-Progress"
                                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    IN PROGRESS
                                </SelectItem>
                                <SelectItem
                                    value="Done"
                                    className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    DONE
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            {mutation.isPending ? "Updating..." : "Update Task"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

