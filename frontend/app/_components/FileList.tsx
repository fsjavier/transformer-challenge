import React from "react";
import { CSVData, CSVFile } from "@/app/_lib/types";
import { fetchCSVContent } from "../_lib/actions";

interface FileListProps {
  files: CSVFile[];
  setData: (data: CSVData) => void;
  setError: (error: string) => void;
  setLoadStatus: (status: "loading" | "success" | "error") => void;
}

export default function FileList({
  files,
  setData,
  setError,
  setLoadStatus,
}: FileListProps) {
  const handleFileSelect = async (fileId: string) => {
    setLoadStatus("loading");
    const result = await fetchCSVContent(fileId);
    if (result.success) {
      setData({ headers: result.headers, rows: result.rows });
      setLoadStatus("success");
    } else {
      setError(`Error: ${result.error}` || "An error occurred");
      setLoadStatus("error");
    }
  };

  return (
    <div className="bg-background-light rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-4 text-text-dark">Uploaded Files</h3>
      <ul className="space-y-2">
        {files.map((file) => (
          <li key={file.id} className="flex justify-between items-center">
            <span className="text-text-darkLight">{file.name}</span>
            <button
              onClick={() => handleFileSelect(file.id)}
              className="bg-primary text-text-primary px-3 py-1 rounded hover:bg-primary-dark transition-colors"
            >
              Preview
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
