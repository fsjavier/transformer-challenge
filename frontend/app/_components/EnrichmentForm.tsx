"use client";

import { CSVFile } from "@/app/_lib/types";
import SubmitButton from "./SubmitButton";
import StatusMessage from "./StatusMessage";
import FileSelector from "./FileSelector";
import ApiEndpointInput from "./ApiEndpointInput";
import KeyColumnSelector from "./KeyColumnSelector";
import ApiKeyNameInput from "./ApiKeyNameInput";
import { useEnrichmentForm } from "@/app/_hooks/useEnrichmentForm";

interface EnrichmentFormProps {
  files: CSVFile[];
}

export default function EnrichmentForm({ files }: EnrichmentFormProps) {
  const {
    selectedFile,
    apiEndpoint,
    keyColumn,
    apiKeyName,
    status,
    errorMessage,
    headers,
    handleFileChange,
    handleApiEndpointChange,
    handleKeyColumnChange,
    handleApiKeyNameChange,
    handleSubmit,
  } = useEnrichmentForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FileSelector
        files={files}
        selectedFile={selectedFile}
        onChange={handleFileChange}
      />
      <ApiEndpointInput
        apiEndpoint={apiEndpoint}
        onChange={handleApiEndpointChange}
      />
      <KeyColumnSelector
        headers={headers}
        keyColumn={keyColumn}
        onChange={handleKeyColumnChange}
      />
      <ApiKeyNameInput
        apiKeyName={apiKeyName}
        onChange={handleApiKeyNameChange}
      />
      <SubmitButton
        disabled={
          status === "loading" ||
          !selectedFile ||
          !apiEndpoint ||
          !keyColumn ||
          !apiKeyName
        }
        text={status === "loading" ? "Enriching..." : "Enrich Data"}
      />
      <StatusMessage status={status} errorMessage={errorMessage} />
    </form>
  );
}
