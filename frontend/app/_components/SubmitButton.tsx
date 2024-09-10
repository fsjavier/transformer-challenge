"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

interface SubmitButtonProps {
  disabled: boolean;
  text?: string;
}

export default function SubmitButton({ disabled, text }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full bg-background-dark hover:bg-blue-800 text-text-light font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={pending || disabled}
    >
      {pending ? (
        <span className="flex items-center justify-center">
          <SpinnerMini />
        </span>
      ) : (
        text
      )}
    </button>
  );
}
