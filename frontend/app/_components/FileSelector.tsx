import { ChangeEvent } from "react";
import { CSVFile } from "@/app/_lib/types";

interface FileSelectorProps {
  files: CSVFile[];
  selectedFile: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function FileSelector({
  files,
  selectedFile,
  onChange,
}: FileSelectorProps) {
  return (
    <div>
      <label
        htmlFor="file"
        className="block text-sm font-medium text-text-dark"
      >
        Select File
      </label>
      <select
        id="file"
        value={selectedFile}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-border-light shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        required
      >
        <option value="">Select a file</option>
        {files.map((file) => (
          <option key={file.id} value={file.id}>
            {file.name}
          </option>
        ))}
      </select>
    </div>
  );
}
