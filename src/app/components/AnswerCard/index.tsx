import type {ReactElement} from "react";
import type {Answer} from "@/app/interfaces/Answer";

interface AnswerCardProps {
  answer: Answer;
  index: number;
}

export default function AnswerCard(props: AnswerCardProps): ReactElement {
  const {answer, index} = props;
  const date = answer.created_at.toString().split("T")[0];

  return (
    <section className="col-span-6 mx-6 grid">
      <div className="flex justify-between rounded-t-lg bg-purple-800 p-2 ">
        <p className="text-sm font-semibold">Answer #{index + 1}</p>
        <p className="text-sm">{date}</p>
      </div>
      <p className="rounded-b-lg bg-white p-4 font-semibold text-black">{answer.text}</p>
    </section>
  );
}
