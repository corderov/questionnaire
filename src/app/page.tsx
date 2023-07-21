import {revalidatePath} from "next/cache";

import supabase from "@/utils/supabase";

import QuestionCard from "./components/QuestionCard";
import QuestionForm from "./components/QuestionForm";

async function getQuestions() {
  const questions = await supabase
    .from("questions")
    .select()
    .then(({data}) => data as {id: string; text: string}[]);

  return questions;
}

export default async function Home() {
  const questions = await getQuestions();

  async function handleSubmit(formData: FormData) {
    "use server";
    const question = formData.get("question");

    await supabase.from("questions").insert({text: question});
    revalidatePath("/");
  }

  return (
    <div className="grid gap-8">
      <QuestionForm handleSubmit={handleSubmit} />
      <hr className="opacity-30" />
      <article className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] items-start gap-4">
        {questions.map((question) => (
          <QuestionCard key={question.id} link question={question} />
        ))}
      </article>
    </div>
  );
}
