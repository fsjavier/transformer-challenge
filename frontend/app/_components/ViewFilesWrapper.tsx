"use client";

import React, { useState } from "react";
import FileList from "./FileList";
import { CSVData, CSVFile } from "@/app/_lib/types";
import FilePreview from "./FilePreview";
import StatusMessage from "./StatusMessage";
import SpinnerMini from "./SpinnerMini";

interface ViewDataWrapperProps {
  initialFiles: CSVFile[] | [];
}

export default function ViewDataWrapper({
  initialFiles,
}: ViewDataWrapperProps) {
  const [data, setData] = useState<CSVData>({ headers: [], rows: [] });
  const [error, setError] = useState<string>("");
  const [loadStatus, setLoadStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <FileList
          files={initialFiles}
          setData={setData}
          setError={setError}
          setLoadStatus={setLoadStatus}
        />
      </div>
      <div className="lg:col-span-2 text-center">
        {loadStatus === "loading" && <SpinnerMini />}
        {loadStatus === "success" && <FilePreview data={data} />}
        {loadStatus === "error" && (
          <StatusMessage status={loadStatus} errorMessage={error} />
        )}
      </div>
    </div>
  );
}
