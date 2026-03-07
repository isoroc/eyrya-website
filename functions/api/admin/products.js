// Admin API - 产品管理
import { 
  getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct,
  getCategories
} from '../../../lib/db.js';

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  const category = url.searchParams.get('category');
  
  try {
    if (slug) {
      // 获取单个产品
      const product = await getProductBySlug(env.DB, slug);
      if (!product) {
        return new Response(JSON.stringify({ error: 'Product not found' }), { 
          status: 404, 
          headers: { 'Content-Type': 'application/json' } 
        });
      }
      // 解析 JSON 字段
      if (product.images) product.images = JSON.parse(product.images);
      if (product.specs) product.specs = JSON.parse(product.specs);
      return new Response(JSON.stringify(product), { 
        headers: { 'Content-Type': 'application/json' } 
      });
    } else {
      // 获取产品列表
      const products = await getProducts(env.DB, { category });
      // 解析 JSON 字段
      products.forEach(p => {
        if (p.images) p.images = JSON.parse(p.images);
        if (p.specs) p.specs = JSON.parse(p.specs);
      });
      return new Response(JSON.stringify(products), { 
        headers: { 'Content-Type': 'application/json' } 
      });
    }
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
    
    // 验证必填字段
    if (!data.slug || !data.name) {
      return new Response(JSON.stringify({ error: 'Slug and name are required' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }
    
    const result = await createProduct(env.DB, data);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Product created successfully',
      id: result.meta?.last_row_id 
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
    const result = await updateProduct(env.DB, slug, data);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Product updated successfully' 
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

export async function onRequestDelete(context) {
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
    await deleteProduct(env.DB, slug);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Product deleted successfully' 
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
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
    case 'DELETE':
      return onRequestDelete(context);
    default:
      return new Response('Method not allowed', { status: 405 });
  }
}
