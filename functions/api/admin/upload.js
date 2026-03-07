// Admin API - 图片上传 (R2)
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({ error: 'Only image files allowed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 生成唯一文件名
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const extension = file.name.split('.').pop();
    const key = `products/${timestamp}-${random}.${extension}`;
    
    // 上传到 R2
    await env.IMAGES_BUCKET.put(key, file.stream(), {
      httpMetadata: {
        contentType: file.type,
      },
    });
    
    // 生成图片 URL
    // 如果有自定义域名: https://images.eyrya.com/key
    // 否则使用 R2 默认 URL
    const imageUrl = env.IMAGES_CUSTOM_DOMAIN 
      ? `https://${env.IMAGES_CUSTOM_DOMAIN}/${key}`
      : `https://${env.IMAGES_BUCKET}.r2.cloudflarestorage.com/${key}`;
    
    return new Response(JSON.stringify({
      success: true,
      url: imageUrl,
      key: key
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  
  if (!key) {
    return new Response(JSON.stringify({ error: 'Key is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    await env.IMAGES_BUCKET.delete(key);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Image deleted successfully'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Delete error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequest(context) {
  const { request } = context;
  
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
  
  switch (request.method) {
    case 'POST':
      return onRequestPost(context);
    case 'DELETE':
      return onRequestDelete(context);
    default:
      return new Response('Method not allowed', { status: 405 });
  }
}
