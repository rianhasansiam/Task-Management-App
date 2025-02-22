import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


// Base URL for the API (replace with your actual API endpoint)
const API_URL = 'http://localhost:5000/tasks';



export const useAddData = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (newTask) => {
        const { data } = await axios.post(API_URL, newTask);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']); // Refetch tasks after adding
      },
    });
  };



//   const [taskTitle, setTaskTitle] = useState('');
//   const mutation = useAddTask();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutation.mutate({ title: taskTitle, completed: false });
//     setTaskTitle('');
//   };