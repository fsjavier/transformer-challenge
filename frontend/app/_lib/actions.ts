"use server";

import { revalidatePath } from "next/cache";
import {
  uploadCSVService,
  fetchCSVContentService,
  fetchCSVFilesService,
} from "./data-service";

export async function fetchCSVContent(fileId: string) {
  try {
    const result = await fetchCSVContentService(fileId);
    return result;
  } catch (error) {
    console.error("Fetch CSV content error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function uploadCSV(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const result = await uploadCSVService(formData);

    if (result.success) {
      revalidatePath("/upload");
      const csvContent = await fetchCSVContent(result.fileId);
      if (csvContent.success) {
        return { fileId: result.fileId, ...csvContent };
      } else {
        return {
          success: false,
          error: csvContent.error || "Failed to fetch CSV content",
        };
      }
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function fetchCSVFiles() {
  try {
    const result = await fetchCSVFilesService();
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
