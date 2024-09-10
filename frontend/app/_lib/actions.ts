"use server";

import { revalidatePath } from "next/cache";
import { uploadCSVService } from "./data-service";

export async function uploadCSV(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, error: "No file provided" };
  }

  try {
    const result = await uploadCSVService(formData);

    if (result.success) {
      revalidatePath("/upload");
      return { success: true };
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
