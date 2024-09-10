interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header
      className={`bg-primary text-text-primary flex items-center justify-center p-4 border-b border-border-light ${className}`}
    >
      <h1 className="text-2xl font-bold">CSV File Manager</h1>
    </header>
  );
}
