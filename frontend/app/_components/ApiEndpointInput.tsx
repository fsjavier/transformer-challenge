import { ChangeEvent } from "react";

interface ApiEndpointInputProps {
  apiEndpoint: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ApiEndpointInput({
  apiEndpoint,
  onChange,
}: ApiEndpointInputProps) {
  return (
    <div>
      <label
        htmlFor="apiEndpoint"
        className="block text-sm font-medium text-text-dark"
      >
        API Endpoint
      </label>
      <input
        type="url"
        id="apiEndpoint"
        value={apiEndpoint}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-border-light shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        required
      />
    </div>
  );
}
