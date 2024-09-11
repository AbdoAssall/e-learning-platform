import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateExam } from "../services/apiExams";
import { toast } from "react-hot-toast";

export function useUpdateExam() {
  const queryClient = useQueryClient();

  const { mutate: updateExam, isLoading: isEditing } = useMutation({
    mutationFn: ({ newExamData, id }) => createUpdateExam(newExamData, id),
    onSuccess: () => {
      toast.success("Exam successfully edited");
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateExam, isEditing };
}
