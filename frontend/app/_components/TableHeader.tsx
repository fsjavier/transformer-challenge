interface TableHeaderProps {
  headers: string[];
}

export default function TableHeader({ headers }: TableHeaderProps) {
  return (
    <thead className="text-xs text-text-dark uppercase bg-background-secondary">
      <tr>
        {headers.map((header, index) => (
          <th key={index} scope="col" className="px-6 py-3">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
