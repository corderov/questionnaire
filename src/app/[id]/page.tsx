import Link from "next/link";
import {revalidatePath} from "next/cache";

import supabase from "@/utils/supabase";

import QuestionCard from "../components/QuestionCard";
import AnswerCard from "../components/AnswerCard";
import AnswerCardForm from "../components/AnswerForm";

async function getQuestion(id: string) {
  const question = await supabase
    .from("questions")
    .select()
    .eq("id", id)
    .single()
    .then(({data}) => data as {id: string; text: string});

  return question;
}

async function getAnswers(idQuestion: string) {
  const answers = await supabase
    .from("answers")
    .select()
    .eq("idQuestion", idQuestion)
    .then(({data}) => data as {id: string; text: string; created_at: Date}[]);

  return answers;
}

export default async function Question({params: {id}}: {params: {id: string}}) {
  const question = await getQuestion(id);
  const answers = await getAnswers(id);

  async function handleSubmit(formData: FormData) {
    "use server";
    const answer = formData.get("answer");

    await supabase.from("answers").insert({idQuestion: id, text: answer});

    revalidatePath(`/[id]`);
  }

  return (
    <article className="grid gap-4">
      <Link className="rounded-lg border text-center" href="/">
        ← Atras
      </Link>
      <QuestionCard question={question} />
      <hr className=" col-span-6 my-4 opacity-30" />
      <AnswerCardForm handleSubmit={handleSubmit} />
      <p className="col-span-6 text-center text-lg">↓ Answers ↓</p>
      {answers.length === 0 ? (
        <p className=" col-span-6 text-center font-bold"> - No answers yet -</p>
      ) : (
        answers.map((answer, index) => <AnswerCard key={answer.id} answer={answer} index={index} />)
      )}
    </article>
  );
}
