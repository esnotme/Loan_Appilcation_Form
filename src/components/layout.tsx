export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Shared header */}
      <header className="bg-blue-900 py-4 px-6">
        <h1 className="text-white text-2xl font-bold">Loan Application Form</h1>
      </header>

      {/* Shared content area */}
      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
