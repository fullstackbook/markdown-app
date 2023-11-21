export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen m-auto max-w-xs items-center justify-center">
      {children}
    </div>
  );
}
