const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://backend:8000/api";

export async function uploadCSVService(formData: FormData) {
  const response = await fetch(`${API_URL}/csv-files/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json();
    const errorMessages = Object.values(data.error).flat();
    throw new Error(`Failed to upload CSV: ${errorMessages.join(", ")}`);
  }

  return response.json();
}

export async function fetchCSVContentService(fileId: string) {
  const response = await fetch(`${API_URL}/csv-files/${fileId}/content/`);

  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data.error;
    throw new Error(`Failed to fetch CSV content: ${errorMessage}`);
  }

  return response.json();
}

export async function fetchCSVFilesService() {
  const response = await fetch(`${API_URL}/csv-files/`);

  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data.error;
    throw new Error(`Failed to fetch CSV content: ${errorMessage}`);
  }

  return response.json();
}
