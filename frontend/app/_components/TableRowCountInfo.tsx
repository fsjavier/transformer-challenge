interface TableRowCountInfoProps {
  totalRows: number;
  displayedRows: number;
}

export default function TableRowCountInfo({
  totalRows,
  displayedRows,
}: TableRowCountInfoProps) {
  if (totalRows <= displayedRows) return null;

  return (
    <p className="mt-2 text-sm text-text-darkLigth">
      Showing first {displayedRows} rows out of {totalRows}
    </p>
  );
}
