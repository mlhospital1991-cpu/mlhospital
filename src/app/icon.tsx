import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Route segment config
export const runtime = 'nodejs';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default async function Icon() {
  try {
    // Read the logo from the public directory
    const logoBuffer = await readFile(join(process.cwd(), 'public/logo.jpg'));
    const logoBase64 = `data:image/jpeg;base64,${logoBuffer.toString('base64')}`;

    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div
          style={{
            fontSize: 24,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <img
            src={logoBase64}
            width={32}
            height={32}
            style={{ borderRadius: '50%' }}
            alt="ML Hospital"
          />
        </div>
      ),
      // ImageResponse options
      {
        ...size,
      }
    );
  } catch (e) {
    console.error('Failed to generate icon:', e);
    // Fallback if logo not found
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
            background: '#45a08e',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          ML
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
