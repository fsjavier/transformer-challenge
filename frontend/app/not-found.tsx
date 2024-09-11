import Link from "next/link";

function NotFound() {
  return (
    <div className="text-center space-y-6 mt-4 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold">
        This page could not be found :(
      </h2>
      <Link
        href="/"
        className="bg-background-light text-text-dark px-6 py-3 text-lg"
      >
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
