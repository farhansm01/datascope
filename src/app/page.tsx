// Landing page for DataScope: platform overview, feature highlights, and demo login info.
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between">
      {/* Top navigation */}
      <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            D
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight block">DataScope</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 block">
              Enterprise
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-100 transition"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero section */}
      <main className="max-w-7xl mx-auto px-6 py-16 flex-1 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
          <span>PostgreSQL + Trigram Search Optimized</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 max-w-4xl">
          Enterprise Data Discovery & Intelligence Platform
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
          Explore, search, filter, and analyze hundreds of thousands of records with sub-second
          query execution, dynamic table fields, and role-based access.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
          >
            Open DataScope &rarr;
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 text-base font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Create Viewer Account
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full max-w-5xl">
          <div className="p-6 rounded-xl border border-gray-200 bg-gray-50/50">
            <div className="h-8 w-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">
              ⚡
            </div>
            <h3 className="font-semibold text-gray-900 text-base">Trigram Partial Search</h3>
            <p className="mt-2 text-sm text-gray-600">
              PostgreSQL <code className="text-xs bg-gray-200 px-1 py-0.5 rounded">pg_trgm</code> GIN
              indexes deliver 1ms substring matching across 100,000+ customer records.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 bg-gray-50/50">
            <div className="h-8 w-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">
              🔍
            </div>
            <h3 className="font-semibold text-gray-900 text-base">Multi-Condition Filters</h3>
            <p className="mt-2 text-sm text-gray-600">
              Combine exact values, numeric ranges, and date intervals together with composite
              B-Tree indexes for fast filtered lookups.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-gray-200 bg-gray-50/50">
            <div className="h-8 w-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">
              🛡️
            </div>
            <h3 className="font-semibold text-gray-900 text-base">Role-Based Security</h3>
            <p className="mt-2 text-sm text-gray-600">
              Three-tier access model (Admin, Data Analyst, Viewer) protecting sensitive datasets,
              views, and system settings.
            </p>
          </div>
        </div>

        {/* Test Accounts Box */}
        <div className="mt-12 w-full max-w-xl rounded-xl border border-blue-200 bg-blue-50/60 p-5 text-left">
          <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wide">
            Test Accounts (Password for all: <span className="font-mono">Password123!</span>)
          </h4>
          <ul className="mt-3 text-xs text-blue-950 space-y-1.5">
            <li>
              <b>Admin:</b> <code className="bg-blue-100 px-1.5 py-0.5 rounded">admin@datascope.test</code> — Full access, users & roles, all datasets
            </li>
            <li>
              <b>Analyst:</b> <code className="bg-blue-100 px-1.5 py-0.5 rounded">analyst@datascope.test</code> — Advanced search, analytics, saved views
            </li>
            <li>
              <b>Viewer:</b> <code className="bg-blue-100 px-1.5 py-0.5 rounded">viewer@datascope.test</code> — Search and filter authorized datasets
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        DataScope Enterprise Platform &middot; Built with Next.js App Router, PostgreSQL & Drizzle
      </footer>
    </div>
  );
}
