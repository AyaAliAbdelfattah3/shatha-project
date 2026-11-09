import { handleUpload } from '@vercel/blob/client';

export default async function handler(request, response) {
  try {
    const jsonResponse = await handleUpload({
      body: request.body,
      request,
      // لا تمرر token، دع Vercel يستخدم OIDC تلقائيًا
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('Upload completed:', blob.url);
      },
    });
    return response.status(200).json(jsonResponse);
  } catch (error) {
    console.error("Blob Error:", error);
    return response.status(400).json({ error: error.message });
  }
}