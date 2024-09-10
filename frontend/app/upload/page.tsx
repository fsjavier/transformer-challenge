import { Metadata } from "next";
import UploadFormWrapper from "@/app/_components/UploadFormWrapper";

export const metadata: Metadata = {
  title: "Upload CSV File | CSV File Manager",
  description: "Upload your CSV files for processing and analysis.",
};

export default function UploadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-text-dark">
        Upload CSV File
      </h2>
      <UploadFormWrapper />
    </div>
  );
}
