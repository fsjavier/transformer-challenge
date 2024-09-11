import { useState, ChangeEvent, FormEvent } from "react";
import {
  enrichCSV,
  fetchCSVHeaders,
  checkEnrichmentStatus,
} from "@/app/_lib/actions";

export function useEnrichmentForm() {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [apiEndpoint, setApiEndpoint] = useState<string>("");
  const [keyColumn, setKeyColumn] = useState<string>("");
  const [apiKeyName, setApiKeyName] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);

  const handleFileChange = async function (e: ChangeEvent<HTMLSelectElement>) {
    const fileId = e.target.value;
    setSelectedFile(fileId);
    if (fileId) {
      setStatus("loading");
      const result = await fetchCSVHeaders(fileId);
      if (result.success) {
        setHeaders(result.headers);
        setKeyColumn(result.headers[0] || "");
        setStatus("idle");
      } else {
        setStatus("error");
        setErrorMessage(result.error ?? "An unknown error occurred");
      }
    } else {
      setHeaders([]);
      setKeyColumn("");
    }
  };

  const handleApiEndpointChange = function (e: ChangeEvent<HTMLInputElement>) {
    setApiEndpoint(e.target.value);
  };

  const handleKeyColumnChange = function (e: ChangeEvent<HTMLSelectElement>) {
    setKeyColumn(e.target.value);
  };

  const handleApiKeyNameChange = function (e: ChangeEvent<HTMLInputElement>) {
    setApiKeyName(e.target.value);
  };

  const handleSubmit = async function (e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("apiEndpoint", apiEndpoint);
      formData.append("keyColumn", keyColumn);
      formData.append("apiKeyName", apiKeyName);

      const result = await enrichCSV(formData);

      if (result.success) {
        getEnrichmentStatus(result.taskId);
      } else {
        throw new Error(result.error || "An error occurred during enrichment");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const getEnrichmentStatus = async function (taskId: string) {
    const result = await checkEnrichmentStatus(taskId);
    if (result.success) {
      if (result.status === "completed") {
        setStatus("success");
      } else if (result.status === "failed") {
        setStatus("error");
        setErrorMessage(result.error || "Enrichment failed");
      } else if (
        result.status === "pending" ||
        result.status === "in_progress"
      ) {
        setTimeout(() => getEnrichmentStatus(taskId), 2000);
      }
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Failed to check enrichment status");
    }
  };

  return {
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
  };
}
