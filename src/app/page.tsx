// DataScope enterprise landing page: architecture highlights, performance benchmarks, and demo personas.
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 font-extrabold text-white shadow-lg shadow-blue-500/25">
              D
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white block">
                DataScope
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block -mt-1">
                Enterprise Intelligence
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#benchmarks" className="hover:text-white transition">Benchmarks</a>
            <a href="#personas" className="hover:text-white transition">Demo Personas</a>
            <a href="#architecture" className="hover:text-white transition">Architecture</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-600/30 hover:bg-blue-500 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PostgreSQL GIN Trigram &middot; Sub-3ms Query Engine</span>
          </div>

          <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Enterprise Data Discovery at{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Sub-Second Scale
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
            Explore, search, filter, and inspect hundreds of thousands of structured records
            without downloading full datasets. Engineered with PostgreSQL indexing, Drizzle ORM,
            and role-based security.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-blue-600/25 hover:bg-blue-500 transition"
            >
              Launch Demo Platform &rarr;
            </Link>
            <a
              href="#personas"
              className="rounded-xl border border-slate-700 bg-slate-900/80 px-7 py-3.5 text-base font-semibold text-slate-200 hover:bg-slate-800 transition"
            >
              View Test Logins
            </a>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">130,000+</div>
              <div className="mt-1 text-xs text-slate-400">Pre-seeded Records</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">1.06 ms</div>
              <div className="mt-1 text-xs text-slate-400">Trigram Substring Match</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">2.98 ms</div>
              <div className="mt-1 text-xs text-slate-400">Multi-Filter Queries</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">3 Tiers</div>
              <div className="mt-1 text-xs text-slate-400">Admin &bull; Analyst &bull; Viewer</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Personas Section */}
      <section id="personas" className="border-t border-slate-800 bg-slate-900/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Interactive Access
            </h2>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Log in with Pre-Configured Personas
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Password for all personas: <code className="rounded bg-slate-800 px-2 py-0.5 font-mono text-blue-300">Password123!</code>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Admin Persona */}
            <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-950/30 to-slate-900/60 p-6 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-purple-500/20 border border-purple-400/30 px-3 py-1 text-xs font-semibold text-purple-300">
                    Administrator
                  </span>
                  <span className="text-xs text-slate-400">Full Permissions</span>
                </div>
                <h4 className="text-lg font-bold text-white">Platform Administrator</h4>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Universal visibility over all collections. Create, edit, and delete datasets,
                  configure access permissions, and manage user roles.
                </p>
                <div className="mt-4 rounded-lg bg-slate-950/80 p-3 font-mono text-xs text-slate-200 border border-slate-800">
                  <div>Email: <b>admin@datascope.test</b></div>
                  <div className="mt-1">Pass: <b>Password123!</b></div>
                </div>
              </div>
              <Link
                href="/login"
                className="mt-6 block text-center rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-500 transition"
              >
                Log in as Admin &rarr;
              </Link>
            </div>

            {/* Analyst Persona */}
            <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-950/30 to-slate-900/60 p-6 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-xs font-semibold text-blue-300">
                    Data Analyst
                  </span>
                  <span className="text-xs text-slate-400">Deep Discovery</span>
                </div>
                <h4 className="text-lg font-bold text-white">Data Analyst</h4>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Explore authorized collections (including restricted Sales Leads), build multi-condition
                  filters, create and share saved views, and inspect analytics.
                </p>
                <div className="mt-4 rounded-lg bg-slate-950/80 p-3 font-mono text-xs text-slate-200 border border-slate-800">
                  <div>Email: <b>analyst@datascope.test</b></div>
                  <div className="mt-1">Pass: <b>Password123!</b></div>
                </div>
              </div>
              <Link
                href="/login"
                className="mt-6 block text-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition"
              >
                Log in as Analyst &rarr;
              </Link>
            </div>

            {/* Viewer Persona */}
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-slate-900/60 p-6 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Viewer
                  </span>
                  <span className="text-xs text-slate-400">Read-Only</span>
                </div>
                <h4 className="text-lg font-bold text-white">Business Viewer</h4>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  Browse authorized datasets (Customers and Support Tickets). Execute global search,
                  quick filters, inspect details, and open views shared with them.
                </p>
                <div className="mt-4 rounded-lg bg-slate-950/80 p-3 font-mono text-xs text-slate-200 border border-slate-800">
                  <div>Email: <b>viewer@datascope.test</b></div>
                  <div className="mt-1">Pass: <b>Password123!</b></div>
                </div>
              </div>
              <Link
                href="/login"
                className="mt-6 block text-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition"
              >
                Log in as Viewer &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmarks Section */}
      <section id="benchmarks" className="border-t border-slate-800 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Verified Performance
            </h2>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Real Benchmark Results on 100,000+ Records
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Measured using PostgreSQL <code className="text-xs font-mono text-slate-300">EXPLAIN ANALYZE</code> on actual Neon production workloads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Multi-Filter Query
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-emerald-400">2.98 ms</span>
                <span className="text-sm line-through text-slate-500">208 ms</span>
              </div>
              <div className="mt-2 text-xs font-semibold text-emerald-300">
                70x Faster with B-Tree composite index
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                Queries filtering status, country, and dataset simultaneously hit our composite
                <code className="bg-slate-800 px-1 rounded ml-1 text-[11px]">(dataset_id, status, country)</code> index.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Partial Text Search Count
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-emerald-400">1.06 ms</span>
                <span className="text-sm line-through text-slate-500">34.9 ms</span>
              </div>
              <div className="mt-2 text-xs font-semibold text-emerald-300">
                33x Faster with GIN Trigram
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                Substrings on name and email use PostgreSQL <code className="bg-slate-800 px-1 rounded text-[11px]">pg_trgm</code> GIN indexes
                bypassing full table scans.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Deep Offset Page 2000
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-emerald-400">44.5 ms</span>
                <span className="text-sm line-through text-slate-500">58.9 ms</span>
              </div>
              <div className="mt-2 text-xs font-semibold text-emerald-300">
                Server-side offset pagination
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                Direct page jumps supported with server-side limits, avoiding client memory bloat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="border-t border-slate-800 bg-slate-900/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Core Capabilities
            </h2>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Engineered for Scalable Data Operations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg mb-4">
                ⚡
              </div>
              <h4 className="text-base font-bold text-white">Dynamic Field Schemas</h4>
              <p className="mt-2 text-sm text-slate-400">
                Each collection defines dynamic column keys, types (text, number, date, select), and filterability in <code className="text-xs text-slate-300">dataset_fields</code>.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg mb-4">
                💾
              </div>
              <h4 className="text-base font-bold text-white">Saved Views & Shares</h4>
              <p className="mt-2 text-sm text-slate-400">
                Persist filter conditions, sorting orders, and visible columns as reusable views with team sharing capabilities.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg mb-4">
                📈
              </div>
              <h4 className="text-base font-bold text-white">SQL Aggregations</h4>
              <p className="mt-2 text-sm text-slate-400">
                Analytics and category distributions calculated directly in PostgreSQL, preventing heavy dataset transfers to the browser.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-4">
                🔗
              </div>
              <h4 className="text-base font-bold text-white">Record Lineage & History</h4>
              <p className="mt-2 text-sm text-slate-400">
                Inspect audit changes and related entity links directly inside record detail sidepanels.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="h-10 w-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-4">
                🔄
              </div>
              <h4 className="text-base font-bold text-white">RTK Query Server State</h4>
              <p className="mt-2 text-sm text-slate-400">
                Automatic background refetching on focus, request deduplication, and tag-based cache invalidation.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="h-10 w-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg mb-4">
                🛡️
              </div>
              <h4 className="text-base font-bold text-white">Three-Tiered RBAC</h4>
              <p className="mt-2 text-sm text-slate-400">
                Enforced across Next.js edge middleware, server layout guards, and database-level permission rows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Strip */}
      <section id="architecture" className="border-t border-slate-800 py-12 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
            Enterprise Architecture Stack
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-medium text-slate-400">
            <span>Next.js 16 (App Router)</span>
            <span className="text-slate-700">&bull;</span>
            <span>React 19</span>
            <span className="text-slate-700">&bull;</span>
            <span>Tailwind CSS v4</span>
            <span className="text-slate-700">&bull;</span>
            <span>Neon PostgreSQL Serverless</span>
            <span className="text-slate-700">&bull;</span>
            <span>Drizzle ORM</span>
            <span className="text-slate-700">&bull;</span>
            <span>Better Auth</span>
            <span className="text-slate-700">&bull;</span>
            <span>Redux Toolkit & RTK Query</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        DataScope Enterprise Platform &middot; Built with modern TypeScript, PostgreSQL Trigram Indexing & Drizzle ORM.
      </footer>
    </div>
  );
}
