import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { ChangeEvent } from "react";

interface FileUploadAreaProps {
  file: File | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploadArea({
  file,
  onFileChange,
}: FileUploadAreaProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <label
        htmlFor="file-input"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-border-darkLight border-dashed rounded-lg cursor-pointer bg-background-light hover:bg-background-secondary transition duration-300 ease-in-out"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-text-darkLigth" />
          <p className="mb-2 text-sm text-text-dark">Click or tap to upload</p>
        </div>
        <input
          id="file-input"
          name="file"
          type="file"
          className="hidden"
          onChange={onFileChange}
          accept=".csv"
        />
      </label>
      {file && (
        <p className="text-sm text-text-darkLight">
          Selected file: {file.name}
        </p>
      )}
    </div>
  );
}
