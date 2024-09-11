import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteExam as deleteExamApi } from "../services/apiExams";

export function useDeleteExam() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteExam } = useMutation({
    mutationFn: deleteExamApi,
    onSuccess: () => {
      toast.success("exam successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["exams"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteExam };
}
