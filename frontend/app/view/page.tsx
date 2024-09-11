import React from "react";
import ViewFilesWrapper from "@/app/_components/ViewFilesWrapper";
import { fetchCSVFilesService } from "@/app/_lib/data-service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Files",
  description: "View uploaded CSV files",
};

export default async function ViewDataPage() {
  const files = await fetchCSVFilesService();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-text-dark">
        View Uploaded Files
      </h1>
      {files.length === 0 ? (
        <p className="text-text-darkLight">No files uploaded yet</p>
      ) : (
        <ViewFilesWrapper initialFiles={files} />
      )}
    </div>
  );
}
