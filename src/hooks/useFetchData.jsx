import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/tasksPerson';

// Custom Hook for Fetching Tasks with a Query Parameter
export const useFetchData = (queryParam) => {
  return useQuery({
    queryKey: ['tasks', queryParam], // queryKey includes the parameter
    queryFn: async () => {
      // console.log(queryParam,'hook check')
      const { data } = await axios.get(queryParam);
      return data.slice(0, 10); // Fetch first 10 tasks for example
    },
    enabled: !!queryParam // Only run query if the param is provided
  });
};



// const { data: tasks, isLoading, isError, error } = useTasks();