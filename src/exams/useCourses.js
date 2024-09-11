import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../services/apiCourses";

export function useCourses() {
  const {
    isLoading,
    data: { data: courses, count } = {},
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
  });

  return { isLoading, error, courses, count };
}
