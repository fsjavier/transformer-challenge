import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FilePreview from "@/app/_components/FilePreview";

describe("FilePreview", () => {
  const testData = {
    headers: ["post_id", "impression_id", "impression_country"],
    rows: [
      ["1", "1234-5678-9101-1121", "AT"],
      ["2", "2345-6789-1234-5678", "DE"],
    ],
  };

  it("renders the file preview correctly", () => {
    render(<FilePreview data={testData} />);

    expect(screen.getByText("File Preview")).toBeInTheDocument();
    expect(screen.getByText("post_id")).toBeInTheDocument();
    expect(screen.getByText("impression_id")).toBeInTheDocument();
    expect(screen.getByText("impression_country")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1234-5678-9101-1121")).toBeInTheDocument();
    expect(screen.getByText("2345-6789-1234-5678")).toBeInTheDocument();
    expect(screen.getByText("AT")).toBeInTheDocument();
    expect(screen.getByText("DE")).toBeInTheDocument();
  });

  it("displays the correct number of rows", () => {
    render(<FilePreview data={testData} />);

    const rows = screen.getAllByRole("row");
    // +1 for the header row
    expect(rows.length).toBe(testData.rows.length + 1);
  });
});
