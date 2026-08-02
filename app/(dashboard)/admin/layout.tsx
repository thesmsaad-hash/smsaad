import { requireEditorOrAdmin } from '@/features/auth/services/auth-service';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireEditorOrAdmin();

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--color-border)] p-6 hidden md:block">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-brand)] flex items-center justify-center">
            <span className="text-[var(--color-bg)] font-bold text-lg">S</span>
          </div>
          <span className="font-semibold text-lg">Admin</span>
        </div>
        
        <nav className="space-y-2">
          <Link href="/admin" className="block px-3 py-2 rounded-md hover:bg-[var(--color-hover)] text-sm font-medium transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/content" className="block px-3 py-2 rounded-md hover:bg-[var(--color-hover)] text-sm font-medium transition-colors">
            Content
          </Link>
          <Link href="/admin/tools" className="block px-3 py-2 rounded-md hover:bg-[var(--color-hover)] text-sm font-medium transition-colors">
            Tools
          </Link>
          <Link href="/admin/collections" className="block px-3 py-2 rounded-md hover:bg-[var(--color-hover)] text-sm font-medium transition-colors">
            Collections
          </Link>
          {user.profile?.role === 'admin' && (
            <>
              <Link href="/admin/users" className="block px-3 py-2 rounded-md hover:bg-[var(--color-hover)] text-sm font-medium transition-colors">
                Users
              </Link>
              <Link href="/admin/settings" className="block px-3 py-2 rounded-md hover:bg-[var(--color-hover)] text-sm font-medium transition-colors">
                Settings
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Top Navbar */}
        <header className="h-16 border-b border-[var(--color-border)] flex items-center justify-between px-6">
          <div className="md:hidden font-semibold">Admin</div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="text-sm text-[var(--color-text-muted)]">
              {user.email} ({user.profile?.role})
            </div>
          </div>
        </header>

        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
