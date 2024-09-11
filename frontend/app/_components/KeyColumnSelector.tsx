import { ChangeEvent } from "react";

interface KeyColumnSelectorProps {
  headers: string[];
  keyColumn: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function KeyColumnSelector({
  headers,
  keyColumn,
  onChange,
}: KeyColumnSelectorProps) {
  return (
    <div>
      <label
        htmlFor="keyColumn"
        className="block text-sm font-medium text-text-dark"
      >
        Key Column
      </label>
      <select
        id="keyColumn"
        value={keyColumn}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-border-light shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        required
      >
        {headers.map((header) => (
          <option key={header} value={header}>
            {header}
          </option>
        ))}
      </select>
    </div>
  );
}
