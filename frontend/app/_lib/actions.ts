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
    return { success: true, ...result };
  } catch (error) {
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
    revalidatePath("/upload");
    revalidatePath("/view");

    const csvContent = await fetchCSVContent(result.id);
    if (csvContent.success) {
      return { success: true, fileId: result.id, ...csvContent };
    } else {
      throw new Error(csvContent.error || "Failed to fetch CSV content");
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
    const files = await fetchCSVFilesService();
    return { success: true, files };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
