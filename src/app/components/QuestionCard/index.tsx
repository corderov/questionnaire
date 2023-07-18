import type {ReactElement} from "react";
import type {Question} from "@/app/interfaces/Question";

import Link from "next/link";
interface QuestionCardProps {
  question: Question;
  link?: boolean;
}

export default function QuestionCard(props: QuestionCardProps): ReactElement {
  const {question, link} = props;

  const withLink = link ?? false;

  return (
    <>
      {withLink ? (
        <Link className="grid" href={`/${question.id}`}>
          <p className="rounded-t-lg bg-purple-400 p-4 text-xl">Question #{question.id}</p>
          <p className="rounded-b-lg bg-white p-4 font-semibold text-black">{question.text}</p>
        </Link>
      ) : (
        <section className="col-span-6 grid">
          <p className="rounded-t-lg bg-purple-400 p-4 text-xl">Question #{question.id}</p>
          <p className="rounded-b-lg bg-white p-4 font-semibold text-black">{question.text}</p>
        </section>
      )}
    </>
  );
}
