import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Health Point Dental Clinic — Al Barsha 1, Dubai';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 50%, #115e59 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '24px',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              color: '#0d9488',
              fontWeight: 800,
            }}
          >
            HP
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: '56px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              HEALTH POINT
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                opacity: 0.85,
                marginTop: '4px',
              }}
            >
              DENTAL CLINIC · DUBAI
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: '22px',
            opacity: 0.9,
            textAlign: 'center',
            maxWidth: '700px',
          }}
        >
          Al Barsha 1, Dubai · DHA Licensed · Walk-ins Daily 1PM–9PM
        </div>
        <div
          style={{
            fontSize: '18px',
            opacity: 0.75,
            marginTop: '16px',
            borderTop: '2px solid rgba(255,255,255,0.2)',
            paddingTop: '16px',
          }}
        >
          Scaling from AED 79
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
