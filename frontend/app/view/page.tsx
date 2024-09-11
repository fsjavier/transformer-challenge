import React from "react";
import { Metadata } from "next";
import ViewFilesWrapper from "@/app/_components/ViewFilesWrapper";
import { fetchCSVFilesService } from "@/app/_lib/data-service";

export const metadata: Metadata = {
  title: "View Files",
  description: "View uploaded CSV files",
};

export default async function ViewDataPage() {
  const files = await fetchCSVFilesService();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-8 text-text-dark">
        View Uploaded Files
      </h2>
      {files.length === 0 ? (
        <p className="text-text-darkLight">No files uploaded yet</p>
      ) : (
        <ViewFilesWrapper initialFiles={files} />
      )}
    </div>
  );
}
