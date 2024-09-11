import { useQuery } from "@tanstack/react-query";
import { getQuestions, getQuestionsByExamId } from "../services/apiQuestions";

export function useQuestions(examId) {
  const {
    isLoading,
    data: { data: questions, count } = {},
    error,
  } = useQuery({
    queryKey: ["questions", examId],
    queryFn: () => getQuestions(examId),
    // enabled: !!examId, // Only run the query if courseId is provided
  });

  return { isLoading, error, questions, count };
}