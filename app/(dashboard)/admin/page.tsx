import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard | SMSAAD',
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  // Fetch some summary stats
  const [
    { count: contentCount },
    { count: toolCount },
    { count: collectionCount }
  ] = await Promise.all([
    supabase.from('content').select('*', { count: 'exact', head: true }),
    supabase.from('tools').select('*', { count: 'exact', head: true }),
    supabase.from('collections').select('*', { count: 'exact', head: true })
  ]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-[var(--color-text-muted)]">Overview of your platform's content and activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-sm">
          <div className="text-[var(--color-text-muted)] text-sm font-medium mb-1">Total Content</div>
          <div className="text-3xl font-bold">{contentCount || 0}</div>
          <Link href="/admin/content" className="text-sm text-[var(--color-brand)] hover:underline mt-4 inline-block">
            Manage Content →
          </Link>
        </div>
        
        <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-sm">
          <div className="text-[var(--color-text-muted)] text-sm font-medium mb-1">Tools Directory</div>
          <div className="text-3xl font-bold">{toolCount || 0}</div>
          <Link href="/admin/tools" className="text-sm text-[var(--color-brand)] hover:underline mt-4 inline-block">
            Manage Tools →
          </Link>
        </div>
        
        <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-sm">
          <div className="text-[var(--color-text-muted)] text-sm font-medium mb-1">Collections</div>
          <div className="text-3xl font-bold">{collectionCount || 0}</div>
          <Link href="/admin/collections" className="text-sm text-[var(--color-brand)] hover:underline mt-4 inline-block">
            Manage Collections &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
