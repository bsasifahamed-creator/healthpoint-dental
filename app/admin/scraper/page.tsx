import { verifyAdminSession } from '@/lib/admin/session';
import { AdminLogin } from '../login-form';
import { listRuns } from '@/lib/scraper/store';
import { AdminBackground } from '@/components/admin/admin-background';
import { ScraperClient } from './scraper-client';

export const dynamic = 'force-dynamic';

export default async function ScraperPage() {
  if (!verifyAdminSession()) return <AdminLogin />;

  const runs = await listRuns();
  const hasGemini = Boolean(process.env.GEMINI_API_KEY?.trim());

  return (
    <div className="relative min-h-screen overflow-hidden text-ink">
      <AdminBackground />
      <ScraperClient initialRuns={runs} hasGemini={hasGemini} />
    </div>
  );
}
