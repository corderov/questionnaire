import {createClient} from "@supabase/supabase-js";
import Link from "next/link";

const supabaseUrl = "https://wlrzozwfqoiceemzmjkj.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);

async function getQuestion(id: string) {
  const question = await supabase
    .from("questions")
    .select()
    .eq("id", id)
    .single()
    .then(({data}) => data as {id: string; text: string});

  return question;
}

export default async function Question({params: {id}}: {params: {id: string}}) {
  // const [inputValue, setInputValue] = useState("");
  // const isButtonDisabled = inputValue === "";
  const question = await getQuestion(id);

  return (
    <article className="grid grid-cols-6 gap-4">
      <Link className="rounded-lg border text-center" href="/">
        ← Atras
      </Link>
      <section key={question.id} className="col-span-6 grid">
        <p className="rounded-t-lg bg-purple-400 p-4 text-xl">Pregunta #{question.id}</p>
        <p className="rounded-b-lg bg-white p-4 font-semibold text-black">{question.text}</p>
      </section>
    </article>
  );
}
