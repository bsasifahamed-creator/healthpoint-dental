import { listDoctors, listServices } from '@/lib/data-store';
import { HomeContent } from '@/components/home/home-content';

export default async function HomePage() {
  const [doctors, services] = await Promise.all([listDoctors(), listServices()]);
  return <HomeContent doctors={doctors} services={services} />;
}
