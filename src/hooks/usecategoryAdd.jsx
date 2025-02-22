import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCategoryAdd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ newTask, API_URL }) => {
      const { data } = await axios.post(API_URL, newTask);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']); // Refetch tasks after adding
    },
  });
};
