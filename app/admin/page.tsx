import { listBookings } from '@/lib/booking/actions';
import { AdminLogin } from './login-form';
import { verifyAdminSession } from '@/lib/admin/session';
import { AdminPageClient } from '@/components/admin/admin-page-client';

export default async function AdminPage() {
  if (!verifyAdminSession()) return <AdminLogin />;

  const { bookings, error } = await listBookings({});

  return <AdminPageClient bookings={bookings} error={error} />;
}
