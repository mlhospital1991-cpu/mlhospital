import { handleUpload, type HandleUploadBody } from '@vercel/blob/next';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname,
        /* clientPayload */
      ) => {
        // Generate a client token for the browser to upload the file
        // You can add logic here to check if the user is authorized
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'application/pdf'],
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            // user_id: 'user_123',
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // This logic runs on your server after the file is uploaded to Vercel Blob
        console.log('Blob upload completed', blob, tokenPayload);

        try {
          // You could update your database here, but we'll do it 
          // in the main second-opinion API call for simplicity.
        } catch (error) {
          throw new Error('Could not update database');
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The error quickly helps debug
    );
  }
}
