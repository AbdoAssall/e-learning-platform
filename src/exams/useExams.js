import { useQuery } from "@tanstack/react-query";
import { getExams } from "../../services/apiExams";

export function useExams() {
  const {
    isLoading,
    data: { data: exams, count } = {},
    error,
  } = useQuery({
    queryKey: ["exams"],
    queryFn: () => getExams(),
  });

  return { isLoading, error, exams, count };
}
