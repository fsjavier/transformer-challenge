import { EnrichmentData } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:8000/api";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const data = await response.json();
    console.log(data.error);
    const errorMessage =
      typeof data.error === "object"
        ? Object.values(data.error).flat()
        : data.error || "An error occurred";
    console.log(errorMessage);
    throw new Error(
      Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage
    );
  }
  return response.json();
}

export async function uploadCSVService(formData: FormData) {
  const response = await fetch(`${API_URL}/csv-files/`, {
    method: "POST",
    body: formData,
  });
  return handleResponse(response);
}

export async function fetchCSVContentService(fileId: string) {
  const response = await fetch(`${API_URL}/csv-files/${fileId}/content/`);
  return handleResponse(response);
}

export async function fetchCSVFilesService() {
  const response = await fetch(`${API_URL}/csv-files/`);
  return handleResponse(response);
}

export async function enrichCSVService(
  fileId: string,
  enrichmentData: EnrichmentData
) {
  const response = await fetch(`${API_URL}/csv-files/${fileId}/enrich/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enrichmentData),
  });
  return handleResponse(response);
}

export async function checkEnrichmentStatusService(taskId: string) {
  const response = await fetch(`${API_URL}/enrichment-tasks/${taskId}/`);
  return handleResponse(response);
}

export async function fetchCSVHeadersService(fileId: string) {
  const response = await fetch(`${API_URL}/csv-files/${fileId}/headers/`);
  return handleResponse(response);
}
