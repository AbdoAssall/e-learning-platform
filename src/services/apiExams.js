import supabase from "./supabase";

export async function getExams() {
  const { data, error, count } = await supabase
    .from("exams")
    .select("* , courses(*)", { count: "exact" });

  if (error) {
    console.error(error);
    throw new Error("Exams could not be loaded");
  }
  console.log(data);

  return { data, count };
}

export async function createUpdateExam(exam, id) {
  let query = supabase.from("exams");
  // A) CREATE
  if (!id) query = query.insert([{ ...exam }]);

  //  B) EDIT
  if (id) query = query.update({ ...exam }).eq("id", id);

  const { data, error } = await query.select();
  // .single()

  if (error) {
    console.error(error);
    throw new Error("Exam could not be added to cart");
  }

  return data[0];
}

export async function deleteExam(id) {
  const { data, error } = await supabase.from("exams").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("exam could not be deleted");
  }

  return data;
}
