const API_URL = "http://backend:8000/api";

export async function uploadCSVService(formData: FormData) {
  try {
    const response = await fetch(`${API_URL}/csv-files/`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error && typeof data.error === "object") {
        const errorMessages = Object.values(data.error).flat();
        return { success: false, error: errorMessages.join(". ") };
      }
      return { success: false, error: data.error || "Failed to upload CSV" };
    }

    return { success: true, fileId: data.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function fetchCSVContentService(fileId: string) {
  try {
    const response = await fetch(`${API_URL}/csv-files/${fileId}/content/`);
    if (!response.ok) {
      throw new Error("Failed to fetch CSV content");
    }
    const data = await response.json();
    return { success: true, headers: data.headers, rows: data.rows };
  } catch (error) {
    console.error("Fetch CSV content error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
