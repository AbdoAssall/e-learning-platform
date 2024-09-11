import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateExam } from "../services/apiExams";
import { toast } from "react-hot-toast";

export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  const { mutate: updateQuestion, isLoading: isEditing } = useMutation({
    mutationFn: ({ newQuestionData, id }) => createUpdateExam(newQuestionData, id),
    onSuccess: () => {
      toast.success("Question successfully edited");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, updateQuestion };
}
