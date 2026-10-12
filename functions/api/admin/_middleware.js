// Auth + CORS middleware for every route under /api/admin/*.
// This runs before the method-specific handlers, so an unauthenticated caller
// never reaches the database or the R2 bucket.
import { applyCorsHeaders, requireAdmin, resolveCorsHeaders } from './_auth.js';

export async function onRequest(context) {
  const { request } = context;
  const corsHeaders = resolveCorsHeaders(request);

  // Preflight must succeed before the browser will send an Authorization header.
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: applyCorsHeaders(new Headers({
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Access-Control-Max-Age': '600',
      }), corsHeaders),
    });
  }

  const unauthorized = requireAdmin(context);
  if (unauthorized) {
    return new Response(unauthorized.body, {
      status: unauthorized.status,
      headers: applyCorsHeaders(new Headers(unauthorized.headers), corsHeaders),
    });
  }

  const response = await context.next();
  const headers = applyCorsHeaders(new Headers(response.headers), corsHeaders);
  headers.set('X-Content-Type-Options', 'nosniff');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
