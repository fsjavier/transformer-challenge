"use client";

import { useState, useRef, ChangeEvent } from "react";
import { uploadCSV } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";
import StatusMessage from "./StatusMessage";
import FileUploadArea from "./FileUploadArea";
import { CSVData } from "@/app/_lib/types";

interface UploadFormProps {
  onUploadSuccess: (data: CSVData) => void;
}

export default function UploadForm({ onUploadSuccess }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      resetState();
    }
  };

  const resetState = () => {
    setUploadStatus("loading");
    setErrorMessage(null);
  };

  const handleSubmit = async (formData: FormData) => {
    if (!file) return;

    resetState();

    try {
      formData.set("file", file);
      formData.set("name", file.name);

      const result = await uploadCSV(formData);

      if (result.success && "headers" in result && "rows" in result) {
        setUploadStatus("success");
        onUploadSuccess({ headers: result.headers, rows: result.rows });
        setFile(null);
        formRef.current?.reset();
      } else {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : JSON.stringify(result.error)
        );
      }
    } catch (err) {
      setUploadStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to upload file. Please try again."
      );
    }
  };

  return (
    <div className="space-y-6">
      <form ref={formRef} action={handleSubmit} className="space-y-6">
        <FileUploadArea file={file} onFileChange={handleFileChange} />
        <SubmitButton disabled={!file} text="Upload" />
        <StatusMessage status={uploadStatus} errorMessage={errorMessage} />
      </form>
    </div>
  );
}
