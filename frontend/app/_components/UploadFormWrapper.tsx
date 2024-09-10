"use client";

import { useState } from "react";
import UploadForm from "./UploadForm";
import FilePreview from "./FilePreview";
import { CSVData } from "@/app/_lib/types";

export default function UploadFormWrapper() {
  const [csvData, setCSVData] = useState<CSVData | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-background-light rounded-lg shadow-md p-6">
          <UploadForm onUploadSuccess={setCSVData} />
        </div>
      </div>
      <div className="lg:col-span-2">
        {csvData && <FilePreview data={csvData} />}
      </div>
    </div>
  );
}
