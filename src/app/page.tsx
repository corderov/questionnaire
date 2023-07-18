import {createClient} from "@supabase/supabase-js";
import {revalidatePath} from "next/cache";
import Link from "next/link";

const supabaseUrl = "https://wlrzozwfqoiceemzmjkj.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey!);

async function getQuestions() {
  const questions = await supabase
    .from("questions")
    .select()
    .then(({data}) => data as {id: string; text: string}[]);

  return questions;
}

export default async function Home() {
  // const [inputValue, setInputValue] = useState("");
  // const isButtonDisabled = inputValue === "";
  const questions = await getQuestions();

  async function handleSubmit(formData: FormData) {
    "use server";
    const question = formData.get("question");

    await supabase.from("questions").insert({text: question});
    revalidatePath("/");
  }

  return (
    <div className="grid gap-8">
      <form action={handleSubmit} className="grid grid-cols-3 gap-4">
        <section className="col-span-3 grid ">
          <p className="rounded-t-lg bg-purple-600 p-4 text-xl">Hello stranger</p>
          <input
            className="rounded-b-lg bg-white p-4  text-black outline-none"
            name="question"
            placeholder="Leave me a question..."
            // value={inputValue}
            // onChange={(e) => setInputValue(e.target.value)}
          />
        </section>
        <button
          className="col-end-4 rounded-lg bg-purple-600 p-2 text-lg hover:bg-purple-400"
          // disabled={isButtonDisabled}
          type="submit"
        >
          Send
        </button>
      </form>
      <hr className="opacity-30" />
      <article className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] items-start gap-4">
        {questions.map((question) => (
          <Link key={question.id} className="grid" href={`/${question.id}`}>
            <p className="rounded-t-lg bg-purple-400 p-4 text-xl">Question #{question.id}</p>
            <p className="rounded-b-lg bg-white p-4 font-semibold text-black">{question.text}</p>
          </Link>
        ))}
      </article>
    </div>
  );
}
