// Admin API - 产品管理
// Auth is enforced by functions/api/admin/_middleware.js before these handlers run.
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../../lib/db.js';
import { jsonResponse } from './_auth.js';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SLUG_LENGTH = 80;
const MAX_NAME_LENGTH = 200;
const MAX_TEXT_LENGTH = 5000;
const MAX_JSON_LENGTH = 20000;
const PRODUCT_STATUSES = new Set(['active', 'inactive', 'draft']);
const JSON_FIELDS = ['images', 'specs', 'features', 'faq'];

function parseJsonField(value, fallback) {
  if (!value) return fallback;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function isPlainString(value) {
  return typeof value === 'string';
}

function checkBoundedString(errors, data, field, maxLength) {
  if (data[field] === undefined || data[field] === null) return;
  if (!isPlainString(data[field])) {
    errors.push(`${field} must be a string`);
    return;
  }
  if (data[field].length > maxLength) {
    errors.push(`${field} must be at most ${maxLength} characters`);
  }
}

function checkBoundedNumber(errors, data, field, min, max, { integer = false } = {}) {
  if (data[field] === undefined || data[field] === null || data[field] === '') return;
  const value = Number(data[field]);
  if (!Number.isFinite(value)) {
    errors.push(`${field} must be a number`);
    return;
  }
  if (integer && !Number.isInteger(value)) {
    errors.push(`${field} must be a whole number`);
    return;
  }
  if (value < min || value > max) {
    errors.push(`${field} must be between ${min} and ${max}`);
  }
}

// Returns an array of human-readable problems; empty means the payload is valid.
function validateProductPayload(data, { requireSlug }) {
  const errors = [];

  if (requireSlug) {
    if (!isPlainString(data.slug) || data.slug.trim() === '') {
      errors.push('slug is required');
    } else if (data.slug.length > MAX_SLUG_LENGTH || !SLUG_PATTERN.test(data.slug)) {
      errors.push('slug must be lowercase letters, numbers, and single hyphens');
    }
  }

  if (requireSlug || data.name !== undefined) {
    if (!isPlainString(data.name) || data.name.trim() === '') {
      errors.push('name is required');
    } else if (data.name.length > MAX_NAME_LENGTH) {
      errors.push(`name must be at most ${MAX_NAME_LENGTH} characters`);
    }
  }

  for (const field of ['description', 'short_description', 'tagline', 'category']) {
    checkBoundedString(errors, data, field, MAX_TEXT_LENGTH);
  }

  if (data.status !== undefined && !PRODUCT_STATUSES.has(data.status)) {
    errors.push(`status must be one of: ${[...PRODUCT_STATUSES].join(', ')}`);
  }

  checkBoundedNumber(errors, data, 'price', 0, 1000000);
  checkBoundedNumber(errors, data, 'original_price', 0, 1000000);
  checkBoundedNumber(errors, data, 'stock', 0, 1000000, { integer: true });
  checkBoundedNumber(errors, data, 'rating', 0, 5);
  checkBoundedNumber(errors, data, 'reviews', 0, 1000000000, { integer: true });
  checkBoundedNumber(errors, data, 'sold', 0, 1000000000, { integer: true });

  if (data.is_bestseller !== undefined && ![0, 1].includes(Number(data.is_bestseller))) {
    errors.push('is_bestseller must be 0 or 1');
  }

  for (const field of JSON_FIELDS) {
    if (data[field] === undefined || data[field] === null) continue;
    if (!isPlainString(data[field])) {
      errors.push(`${field} must be a JSON string`);
      continue;
    }
    if (data[field].length > MAX_JSON_LENGTH) {
      errors.push(`${field} is too large`);
      continue;
    }
    try {
      JSON.parse(data[field]);
    } catch {
      errors.push(`${field} is not valid JSON`);
    }
  }

  return errors;
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  const category = url.searchParams.get('category');

  if (!env.DB) {
    console.error('Database not bound.');
    return jsonResponse({ error: 'Database is not configured' }, 503);
  }

  try {
    if (slug) {
      const product = await getProductBySlug(env.DB, slug);
      if (!product) {
        return jsonResponse({ error: 'Product not found' }, 404);
      }
      product.images = parseJsonField(product.images, []);
      product.specs = parseJsonField(product.specs, {});
      product.features = parseJsonField(product.features, []);
      product.faq = parseJsonField(product.faq, []);
      return jsonResponse(product);
    }

    const products = await getProducts(env.DB, { category });
    products.forEach((product) => {
      product.images = parseJsonField(product.images, []);
      product.specs = parseJsonField(product.specs, {});
      product.features = parseJsonField(product.features, []);
      product.faq = parseJsonField(product.faq, []);
    });
    return jsonResponse(products);
  } catch (error) {
    console.error('GET /api/admin/products failed:', error);
    return jsonResponse({ error: 'Could not load products' }, 500);
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.DB) {
    console.error('Database not bound.');
    return jsonResponse({ error: 'Database is not configured' }, 503);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ error: 'Request body must be valid JSON' }, 400);
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return jsonResponse({ error: 'Request body must be a JSON object' }, 400);
  }

  const errors = validateProductPayload(data, { requireSlug: true });
  if (errors.length > 0) {
    return jsonResponse({ error: 'Validation failed', details: errors }, 400);
  }

  try {
    const result = await createProduct(env.DB, data);
    return jsonResponse({
      success: true,
      message: 'Product created successfully',
      slug: data.slug,
      id: result.meta?.last_row_id,
    }, 201);
  } catch (error) {
    console.error('POST /api/admin/products failed:', error);
    return jsonResponse({ error: 'Could not create product' }, 500);
  }
}

export async function onRequestPut(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  if (!env.DB) {
    console.error('Database not bound.');
    return jsonResponse({ error: 'Database is not configured' }, 503);
  }

  if (!slug) {
    return jsonResponse({ error: 'Slug is required' }, 400);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ error: 'Request body must be valid JSON' }, 400);
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return jsonResponse({ error: 'Request body must be a JSON object' }, 400);
  }

  const errors = validateProductPayload(data, { requireSlug: false });
  if (errors.length > 0) {
    return jsonResponse({ error: 'Validation failed', details: errors }, 400);
  }

  try {
    const result = await updateProduct(env.DB, slug, data);
    if (result.meta?.changes === 0) {
      return jsonResponse({ error: 'Product not found' }, 404);
    }
    return jsonResponse({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error('PUT /api/admin/products failed:', error);
    return jsonResponse({ error: 'Could not update product' }, 500);
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  if (!env.DB) {
    console.error('Database not bound.');
    return jsonResponse({ error: 'Database is not configured' }, 503);
  }

  if (!slug) {
    return jsonResponse({ error: 'Slug is required' }, 400);
  }

  try {
    const result = await deleteProduct(env.DB, slug);
    if (result.meta?.changes === 0) {
      return jsonResponse({ error: 'Product not found' }, 404);
    }
    return jsonResponse({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/admin/products failed:', error);
    return jsonResponse({ error: 'Could not delete product' }, 500);
  }
}

export async function onRequest() {
  // OPTIONS and auth are handled by _middleware.js.
  return jsonResponse({ error: 'Method not allowed' }, 405, { Allow: 'GET, POST, PUT, DELETE, OPTIONS' });
}
