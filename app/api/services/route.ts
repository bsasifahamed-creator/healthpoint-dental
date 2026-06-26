import { listAllServices } from '@/lib/data-store';

export async function GET() {
  const services = await listAllServices();
  return Response.json(services, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
