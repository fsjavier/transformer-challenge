import { ChangeEvent } from "react";

interface ApiKeyNameInputProps {
  apiKeyName: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ApiKeyNameInput({
  apiKeyName,
  onChange,
}: ApiKeyNameInputProps) {
  return (
    <div>
      <label
        htmlFor="apiKeyName"
        className="block text-sm font-medium text-text-dark"
      >
        API Key Name
      </label>
      <input
        type="text"
        id="apiKeyName"
        value={apiKeyName}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-border-light shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        required
      />
    </div>
  );
}
