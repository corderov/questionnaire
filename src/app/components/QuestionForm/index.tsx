"use client";
import {useState, type ReactElement} from "react";

interface QuestionFormProps {
  handleSubmit: (formData: FormData) => Promise<void>;
}

export default function QuestionForm(props: QuestionFormProps): ReactElement {
  const {handleSubmit} = props;
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isButtonDisabled = inputValue === "";

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    await handleSubmit(formData);
    setInputValue("");
    setIsLoading(false);
  };

  return (
    <form action={onSubmit} className="grid grid-cols-3 gap-4">
      <section className="col-span-3 grid ">
        <p className="rounded-t-lg bg-purple-600 p-4 text-xl">Hello stranger</p>
        <input
          className="rounded-b-lg bg-white p-4  text-black outline-none"
          name="question"
          placeholder="Leave a question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </section>
      <button
        className="col-end-4 rounded-lg bg-purple-600 p-2 text-lg hover:bg-purple-400 disabled:bg-purple-300"
        disabled={isButtonDisabled}
        type="submit"
      >
        {isLoading ? "Loader" : "Send"}
      </button>
    </form>
  );
}
