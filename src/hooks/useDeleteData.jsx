import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Base URL for the API (replace with your actual API endpoint)
const API_URL = 'https://jsonplaceholder.typicode.com/todos';



// Custom Hook for Deleting a Task
export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (taskId) => {
        const { data } = await axios.delete(`${API_URL}/${taskId}`);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']); // Refetch tasks after deletion
      },
    });
  };




//   const TaskItem = ({ task }) => {
//     const mutation = useDeleteTask();
  
//     const handleDelete = () => {
//       mutation.mutate(task.id);
//     };