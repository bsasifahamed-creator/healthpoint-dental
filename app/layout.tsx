import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { LenisProvider } from '@/components/providers/lenis-provider';
import { CursorLightProvider } from '@/components/providers/cursor-light-provider';
import { BookingDrawer } from '@/components/booking/drawer';
import { DesktopOnly } from '@/components/layout/DesktopOnly';
import { LiquidEffectAnimation } from '@/components/ui/liquid-effect-animation';
import { Chatbot } from '@/components/chrome/chatbot';
import { CustomCursor } from '@/components/ui/custom-cursor';
import { SiteLoader } from '@/components/chrome/site-loader';
import { JsonLd } from '@/components/seo/json-ld';
import './globals.css';

const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});
const body = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://healthpointdental.ae';

export const metadata: Metadata = {
  title: 'Health Point Dental Clinic — Al Barsha 1, Dubai · DHA Licensed',
  description:
    'Trusted dental care in Al Barsha 1, Dubai. DHA Licensed. Walk-ins daily 1PM–9PM. Scaling from AED 79.',
  metadataBase: new URL(baseUrl),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Health Point Dental Clinic',
    title: 'Health Point Dental Clinic — Al Barsha 1, Dubai · DHA Licensed',
    description:
      'Trusted dental care in Al Barsha 1, Dubai. DHA Licensed. Walk-ins daily 1PM–9PM. Scaling from AED 79.',
    url: '/',
    locale: 'en_AE',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Health Point Dental Clinic — Al Barsha 1, Dubai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Point Dental Clinic — Al Barsha 1, Dubai · DHA Licensed',
    description:
      'Trusted dental care in Al Barsha 1, Dubai. DHA Licensed. Walk-ins daily 1PM–9PM. Scaling from AED 79.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <JsonLd />
        <DesktopOnly>
          <LiquidEffectAnimation />
        </DesktopOnly>
        <CursorLightProvider />
        <LenisProvider>
          <div className="relative z-10">{children}</div>
          <BookingDrawer />
          <Chatbot />
        </LenisProvider>
        <DesktopOnly>
          <CustomCursor />
        </DesktopOnly>
        <SiteLoader />
        <Toaster theme="light" richColors position="top-center" />
      </body>
    </html>
  );
}
