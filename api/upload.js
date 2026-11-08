import { handleUpload } from '@vercel/blob/client';

export default async function handler(request, response) {
  try {
    const body = request.body; // Vercel بتبعت الـ body كـ JSON

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // هنا ممكن تتأكد إن المستخدم مسجل دخول، بس حالياً هنسمح بالكل
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          addRandomSuffix: true, // عشان ميحصلش تعارض في أسامي الملفات
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // دي بتشتغل بعد ما الرفع يخلص، لو حابب تحفظ الرابط في الداتابيز
        console.log('File uploaded to:', blob.url);
      },
    });

    response.status(200).json(jsonResponse);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
}