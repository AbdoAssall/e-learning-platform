import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createUpdateExam } from "../services/apiExams";

export function useCreateExam() {
  const queryClient = useQueryClient();

  const { mutate: createExam, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateExam,
    onSuccess: () => {
      toast.success("New Exam successfully created");
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createExam };
}
