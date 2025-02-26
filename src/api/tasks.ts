import {Task} from "@/pages/Dashboard.tsx";
import {api} from "@/lib/axios.ts";

export const createTask = async (task: Task) => {
    const response = await api.post('/tasks', task);
    return response.data;
}

export const getUserTasks = async (user: string | undefined) => {
    const response = await api.get(`/tasks/${user}`);
    return response.data;
}

export const deleteTask = async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
}


export const updateTask = async ({id, ...updates}: Partial<Task> & { id: string }) => {
    const response = await api.patch(`/tasks/${id}`, updates);
    return response.data;
};

export const updateTaskOrder = async ({id, category, order}: {
    id: string;
    category: string;
    order: number;
}) => {
    const response = await api.patch(`/tasks/${id}/order`, {category, order});
    return response.data;
};