import { useQuery } from "@tanstack/react-query";
import { getQuestions, getQuestionsByExamId } from "../services/apiQuestions";

export function useQuestionsExamId(examId) {
  const {
    isLoading,
    data: { data: questions, count } = {},
    error,
  } = useQuery({
    queryKey: ["questions", examId],
    queryFn: () => getQuestionsByExamId(examId),
    enabled: !!examId, // Only run the query if courseId is provided
  });

  return { isLoading, error, questions, count };
}

export function useQuestions() {
  const {
    isLoading,
    data: { data: questions, count } = {},
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getQuestions(),
  });

  return { isLoading, error, questions, count };
}