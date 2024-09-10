interface TableBodyProps {
  rows: string[][];
}

export default function TableBody({ rows }: TableBodyProps) {
  return (
    <tbody>
      {rows.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className="bg-background-light border-b border-border-light"
        >
          {row.map((cell, cellIndex) => (
            <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
