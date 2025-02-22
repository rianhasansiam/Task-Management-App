import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/tasks'; // Replace with your API endpoint

// Custom Hook for Fetching All Tasks
export const useFetchAllData = () => {
  return useQuery({
    queryKey: ['tasks'], // Simple query key without parameters
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data.slice(0, 10); // Fetch first 10 tasks as an example
    },
  });
};
