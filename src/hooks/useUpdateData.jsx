import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Base URL for the API (replace with your actual API endpoint)
const API_URL = 'https://jsonplaceholder.typicode.com/todos';




// Custom Hook for Updating a Task
export const useUpdateData = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (updatedTask) => {
        const { data } = await axios.put(`${API_URL}/${updatedTask.id}`, updatedTask);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']); // Refetch tasks after updating
      },
    });
  };
  


//   const TaskItem = ({ task }) => {
//     const mutation = useUpdateTask();
  
//     const toggleComplete = () => {
//       mutation.mutate({ ...task, completed: !task.completed });
//     };