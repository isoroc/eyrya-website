// Admin auth for /api/admin/* (Cloudflare Pages Functions).
// Files prefixed with "_" are excluded from Pages file-based routing, so this
// module is never reachable as an endpoint.
import {
  applyCorsHeaders,
  jsonResponse,
  resolveCorsHeaders,
  timingSafeEqual,
} from '../_shared.js';

export { applyCorsHeaders, jsonResponse, resolveCorsHeaders };

const BEARER_PREFIX = 'Bearer ';

// Returns null when the request is authorized, otherwise a Response to send.
export function requireAdmin(context) {
  const { request, env } = context;
  const expected = env.ADMIN_TOKEN;

  // Fail closed: without a configured secret every /api/admin request is refused.
  if (!expected) {
    console.error('ADMIN_TOKEN is not configured; refusing all /api/admin requests.');
    return jsonResponse({ error: 'Admin API is not configured' }, 503);
  }

  const header = request.headers.get('Authorization') || '';
  if (!header.startsWith(BEARER_PREFIX)) {
    return jsonResponse({ error: 'Unauthorized' }, 401, { 'WWW-Authenticate': 'Bearer' });
  }

  if (!timingSafeEqual(header.slice(BEARER_PREFIX.length), expected)) {
    return jsonResponse({ error: 'Unauthorized' }, 401, { 'WWW-Authenticate': 'Bearer' });
  }

  return null;
}
