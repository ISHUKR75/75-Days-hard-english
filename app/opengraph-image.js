import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '75 Days Hard English';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%', width: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 900, color: 'white', marginBottom: 16 }}>
          75 Days Hard English
        </div>
        <div style={{ fontSize: 28, color: '#a5b4fc' }}>
          Master English in 75 Days — Free Forever
        </div>
      </div>
    ),
    { ...size }
  );
}
