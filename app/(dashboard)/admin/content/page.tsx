import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const metadata = {
  title: 'Content Manager | Admin | SMSAAD',
};

export default async function AdminContentPage() {
  const supabase = await createClient();

  const { data: contents, error } = await supabase
    .from('content')
    .select('*, author:profiles(full_name), category:categories(title)')
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Content</h1>
          <p className="text-[var(--color-text-muted)] text-sm">Manage articles, workflows, news, and glossary.</p>
        </div>
        <Link 
          href="/admin/content/new" 
          className="px-4 py-2 bg-[var(--color-brand)] text-[var(--color-bg)] rounded-md font-medium hover:opacity-90 transition-opacity"
        >
          New Content
        </Link>
      </div>

      <div className="bg-[var(--color-bg-elevated)] rounded-xl border border-[var(--color-border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-[var(--color-text-muted)]">Title</th>
                <th scope="col" className="px-6 py-4 font-medium text-[var(--color-text-muted)]">Type</th>
                <th scope="col" className="px-6 py-4 font-medium text-[var(--color-text-muted)]">Status</th>
                <th scope="col" className="px-6 py-4 font-medium text-[var(--color-text-muted)]">Author</th>
                <th scope="col" className="px-6 py-4 font-medium text-[var(--color-text-muted)]">Date</th>
                <th scope="col" className="px-6 py-4 font-medium text-[var(--color-text-muted)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {error && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[var(--color-error)]">
                    Error loading content: {error.message}
                  </td>
                </tr>
              )}
              
              {!error && contents?.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[var(--color-text-muted)]">
                    No content found. Create your first post!
                  </td>
                </tr>
              )}

              {contents?.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--color-hover)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium line-clamp-1">{item.title}</div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-1 truncate max-w-[200px]">
                      /{item.type}/{item.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {item.type}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      item.status === 'Published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      item.status === 'Draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {/* @ts-ignore */}
                    {item.author?.full_name || 'SM Saad (Admin)'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[var(--color-text-muted)]">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link href={`/admin/content/${item.id}`} className="font-bold text-[#7C3AED] hover:text-[#22D3EE] transition-colors">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
