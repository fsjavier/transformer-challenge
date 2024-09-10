import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TableRowCountInfo from "./TableRowCountInfo";
import { CSVData } from "./UploadForm";

interface FilePreviewProps {
  data: CSVData;
}

export default function FilePreview({ data }: FilePreviewProps) {
  const MAX_ROWS_DISPLAY = 10;

  return (
    <div className="bg-background-light rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold mb-4 text-text-dark">File Preview</h3>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-text-darkLigth">
          <TableHeader headers={data.headers} />
          <TableBody rows={data.rows.slice(0, MAX_ROWS_DISPLAY)} />
        </table>
      </div>
      <TableRowCountInfo
        totalRows={data.rows.length}
        displayedRows={MAX_ROWS_DISPLAY}
      />
    </div>
  );
}
