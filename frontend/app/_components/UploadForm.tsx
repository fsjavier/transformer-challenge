"use client";

import { useState, useRef, ChangeEvent } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { uploadCSV } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
      setUploadSuccess(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    if (!file) return;

    setError(null);
    setUploadSuccess(false);

    try {
      formData.set("file", file);
      formData.set("name", file.name);

      const result = await uploadCSV(formData);

      if (result.success) {
        setUploadSuccess(true);
        setFile(null);
        formRef.current?.reset();
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload file. Please try again."
      );
    }
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-input"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-border-darkLight border-dashed rounded-lg cursor-pointer bg-background-light hover:bg-background-secondary transition duration-300 ease-in-out"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-text-darkLigth" />
            <p className="mb-2 text-sm text-text-dark">
              Click or tap to upload
            </p>
          </div>
          <input
            id="file-input"
            name="file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".csv"
          />
        </label>
      </div>
      {file && (
        <p className="text-sm text-text-darkLight">
          Selected file: {file.name}
        </p>
      )}
      <SubmitButton disabled={!file} text="Upload" />
      {uploadSuccess && (
        <p className="mt-4 text-green-500 font-semibold">
          File uploaded successfully!
        </p>
      )}
      {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
    </form>
  );
}
