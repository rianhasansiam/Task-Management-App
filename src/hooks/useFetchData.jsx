import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Base URL for the API (replace with your actual API endpoint)
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Custom Hook for Fetching Tasks
export const useFetchData = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data.slice(0, 10); // Fetch first 10 tasks for example
    },
  });
};



// const { data: tasks, isLoading, isError, error } = useTasks();