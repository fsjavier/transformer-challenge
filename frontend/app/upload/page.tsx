import { Metadata } from "next";
import UploadForm from "@/app/_components/UploadForm";

export const metadata: Metadata = {
  title: "Upload CSV File | CSV File Manager",
  description: "Upload your CSV files for processing and analysis.",
};

export default function UploadPage() {
  return (
    <div className="max-w-md mx-auto p-6 bg-background-light rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-text-dark">
        Upload CSV File
      </h1>
      <UploadForm />
    </div>
  );
}
