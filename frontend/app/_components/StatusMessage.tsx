interface StatusMessageProps {
  status: "loading" | "success" | "error";
  errorMessage: string | null;
}

export default function StatusMessage({
  status,
  errorMessage,
}: StatusMessageProps) {
  if (status === "success") {
    return (
      <p className="mt-4 text-green-500 font-semibold">
        File uploaded successfully!
      </p>
    );
  }
  if (status === "error" && errorMessage) {
    return <p className="mt-4 text-red-500 font-semibold">{errorMessage}</p>;
  }
  return null;
}
