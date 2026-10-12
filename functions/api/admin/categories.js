// Admin API - 分类管理
// Auth is enforced by functions/api/admin/_middleware.js before these handlers run.
import {
  getCategoriesWithProductCounts,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../../lib/db.js';
import { jsonResponse } from './_auth.js';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SLUG_LENGTH = 80;
const MAX_NAME_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 1000;
const CATEGORY_STATUSES = new Set(['active', 'inactive']);
const UPDATABLE_FIELDS = ['name', 'description', 'sort_order', 'status'];

function validateCategoryPayload(data, { requireSlug }) {
  const errors = [];

  if (requireSlug) {
    if (typeof data.slug !== 'string' || data.slug.trim() === '') {
      errors.push('slug is required');
    } else if (data.slug.length > MAX_SLUG_LENGTH || !SLUG_PATTERN.test(data.slug)) {
      errors.push('slug must be lowercase letters, numbers, and single hyphens');
    }
  }

  if (requireSlug || data.name !== undefined) {
    if (typeof data.name !== 'string' || data.name.trim() === '') {
      errors.push('name is required');
    } else if (data.name.length > MAX_NAME_LENGTH) {
      errors.push(`name must be at most ${MAX_NAME_LENGTH} characters`);
    }
  }

  if (data.description !== undefined && data.description !== null) {
    if (typeof data.description !== 'string') {
      errors.push('description must be a string');
    } else if (data.description.length > MAX_DESCRIPTION_LENGTH) {
      errors.push(`description must be at most ${MAX_DESCRIPTION_LENGTH} characters`);
    }
  }

  if (data.sort_order !== undefined && data.sort_order !== null && data.sort_order !== '') {
    const sortOrder = Number(data.sort_order);
    if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 10000) {
      errors.push('sort_order must be a whole number between 0 and 10000');
    }
  }

  if (data.status !== undefined && !CATEGORY_STATUSES.has(data.status)) {
    errors.push(`status must be one of: ${[...CATEGORY_STATUSES].join(', ')}`);
  }

  return errors;
}

export async function onRequestGet(context) {
  const { env } = context;

  if (!env.DB) {
    console.error('Database not bound.');
    return jsonResponse({ error: 'Database is not configured' }, 503);
  }

  try {
    const categories = await getCategoriesWithProductCounts(env.DB);
    return jsonResponse(categories);
  } catch (error) {
    console.error('GET /api/admin/categories failed:', error);
    return jsonResponse({ error: 'Could not load categories' }, 500);
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

  const errors = validateCategoryPayload(data, { requireSlug: true });
  if (errors.length > 0) {
    return jsonResponse({ error: 'Validation failed', details: errors }, 400);
  }

  try {
    const result = await createCategory(env.DB, data);
    return jsonResponse({
      success: true,
      message: 'Category created successfully',
      slug: data.slug,
      id: result.meta?.last_row_id,
    }, 201);
  } catch (error) {
    console.error('POST /api/admin/categories failed:', error);
    return jsonResponse({ error: 'Could not create category' }, 500);
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

  const errors = validateCategoryPayload(data, { requireSlug: false });
  if (errors.length > 0) {
    return jsonResponse({ error: 'Validation failed', details: errors }, 400);
  }

  // Reject an empty update explicitly instead of letting the query builder
  // produce invalid SQL.
  if (!UPDATABLE_FIELDS.some((field) => data[field] !== undefined)) {
    return jsonResponse({ error: 'No updatable fields were provided', details: [`provide at least one of: ${UPDATABLE_FIELDS.join(', ')}`] }, 400);
  }

  try {
    const result = await updateCategory(env.DB, slug, data);
    if (result.meta?.changes === 0) {
      return jsonResponse({ error: 'Category not found' }, 404);
    }
    return jsonResponse({ success: true, message: 'Category updated successfully' });
  } catch (error) {
    console.error('PUT /api/admin/categories failed:', error);
    return jsonResponse({ error: 'Could not update category' }, 500);
  }
}

export async function onRequestDelete(context) {
  const { env } = context;
  const url = new URL(context.request.url);
  const slug = url.searchParams.get('slug');

  if (!env.DB) {
    console.error('Database not bound.');
    return jsonResponse({ error: 'Database is not configured' }, 503);
  }

  if (!slug) {
    return jsonResponse({ error: 'Slug is required' }, 400);
  }

  try {
    const usage = await env.DB.prepare(
      'SELECT COUNT(*) AS count FROM products WHERE category = ?'
    ).bind(slug).first();

    if (Number(usage?.count || 0) > 0) {
      return jsonResponse({ error: 'Category still has products assigned' }, 409);
    }

    const result = await deleteCategory(env.DB, slug);
    if (result.meta?.changes === 0) {
      return jsonResponse({ error: 'Category not found' }, 404);
    }

    return jsonResponse({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/admin/categories failed:', error);
    return jsonResponse({ error: 'Could not delete category' }, 500);
  }
}

export async function onRequest() {
  // OPTIONS and auth are handled by _middleware.js.
  return jsonResponse({ error: 'Method not allowed' }, 405, { Allow: 'GET, POST, PUT, DELETE, OPTIONS' });
}
