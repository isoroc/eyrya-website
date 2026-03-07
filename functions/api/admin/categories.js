// Admin API - 分类管理
import { getCategories, createCategory, updateCategory } from '../../lib/db';

export async function onRequestGet(context) {
  const { env } = context;
  
  try {
    const categories = await getCategories(env.DB);
    return new Response(JSON.stringify(categories), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const data = await request.json();
    
    if (!data.slug || !data.name) {
      return new Response(JSON.stringify({ error: 'Slug and name are required' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }
    
    const result = await createCategory(env.DB, data);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Category created successfully' 
    }), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}

export async function onRequestPut(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
  
  try {
    const data = await request.json();
    await updateCategory(env.DB, slug, data);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Category updated successfully' 
    }), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error('API Error:', error);
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
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
  
  switch (request.method) {
    case 'GET':
      return onRequestGet(context);
    case 'POST':
      return onRequestPost(context);
    case 'PUT':
      return onRequestPut(context);
    default:
      return new Response('Method not allowed', { status: 405 });
  }
}
