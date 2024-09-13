import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteQuestion as deleteQuestionApi } from "../services/apiQuestions";

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteQuestion } = useMutation({
    mutationFn: deleteQuestionApi,
    onSuccess: () => {
      toast.success("question successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteQuestion };
}
