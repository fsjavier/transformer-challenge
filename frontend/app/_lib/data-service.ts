const API_URL = "http://backend:8000/api";

export async function uploadCSVService(formData: FormData) {
  const response = await fetch(`${API_URL}/csv-files/`, {
    method: "POST",
    body: formData,
  });

  console.log("response", response);

  if (!response.ok) {
    throw new Error("Failed to upload CSV");
  }

  return { success: true };
}
