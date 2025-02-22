import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';





// Custom Hook for Updating a Task
export const useUpdateData = (API_URL) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (updatedTask) => {

        console.log(updatedTask)
        console.log(API_URL)

        const { data } = await axios.put(`${API_URL}`, updatedTask);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']); // Refetch tasks after updating
      },
    });
  };
  

