import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createUpdateQuestion } from "../services/apiQuestions";

export function useCreateََQuestion() {
  const queryClient = useQueryClient();

  const { mutate: createQuestion, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateQuestion,
    onSuccess: () => {
      toast.success("New Question successfully created");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createQuestion };
}
