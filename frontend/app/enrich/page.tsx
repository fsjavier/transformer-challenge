import { Metadata } from "next";
import EnrichmentForm from "@/app/_components/EnrichmentForm";
import { fetchCSVFilesService } from "@/app/_lib/data-service";

export const metadata: Metadata = {
  title: "Enrich Data",
  description: "Enrich your CSV files with external data",
};

export default async function EnrichDataPage() {
  const files = await fetchCSVFilesService();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8 text-text-dark">Enrich Data</h2>
      <div className="bg-background-light rounded-lg shadow-md p-6 lg:w-3/4 mx-auto">
        <EnrichmentForm files={files} />
      </div>
    </div>
  );
}
