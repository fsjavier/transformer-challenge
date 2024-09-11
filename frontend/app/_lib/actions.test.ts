import { describe, it, expect, vi } from "vitest";
import { fetchCSVFiles } from "@/app/_lib/actions";
import { fetchCSVFilesService } from "@/app/_lib/data-service";

vi.mock("@/app/_lib/data-service");

describe("fetchCSVFiles", () => {
  it("should return files when the service call is successful", async () => {
    const mockFiles = [
      { id: "1", name: "test1.csv" },
      { id: "2", name: "test2.csv" },
    ];
    vi.mocked(fetchCSVFilesService).mockResolvedValue(mockFiles);

    const result = await fetchCSVFiles();
    console.log(result);

    expect(result).toEqual({ success: true, files: mockFiles });
  });

  it("should return an error when the service call fails", async () => {
    const errorMessage = "Failed to fetch files";
    vi.mocked(fetchCSVFilesService).mockRejectedValue(new Error(errorMessage));

    const result = await fetchCSVFiles();

    expect(result).toEqual({ success: false, error: errorMessage });
  });
});
