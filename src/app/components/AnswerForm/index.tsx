"use client";
import {useState, type ReactElement} from "react";

interface AnswerFormProps {
  handleSubmit: (formData: FormData) => Promise<void>;
}

export default function AnswerCardForm(props: AnswerFormProps): ReactElement {
  const {handleSubmit} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const isButtonDisabled = inputValue === "";

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    await handleSubmit(formData);
    setInputValue("");
    setIsLoading(false);
  };

  return (
    <form action={onSubmit} className="col-span-6 grid gap-4">
      <input
        className="col-span-3 rounded-lg bg-white p-4 text-black outline-none"
        name="answer"
        placeholder="Enter a answer..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className=" col-end-4 rounded-lg bg-purple-700 p-2 text-lg hover:bg-purple-600 disabled:bg-purple-400"
        disabled={isButtonDisabled}
        type="submit"
      >
        {isLoading ? "Loading" : "Send my answer"}
      </button>
    </form>
  );
}
