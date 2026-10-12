// Shared helpers for Cloudflare Pages Functions.
// Files prefixed with "_" are excluded from Pages file-based routing, so this
// module is never reachable as an endpoint.

const ALLOWED_ORIGINS = new Set([
  'https://www.eyrya.com',
  'https://eyrya.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]);

export function resolveCorsHeaders(request) {
  const origin = request.headers.get('Origin');
  const headers = { Vary: 'Origin' };
  // Only echo an origin we recognise. Anything else gets no CORS grant, so a
  // random site cannot read responses from our endpoints.
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

export function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  });
}

export function preflightResponse(corsHeaders) {
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '600',
    },
  });
}

// typeof-safe HTML escaping: FormData.get() returns a File for file parts.
export function escapeHtml(value) {
  if (typeof value !== 'string' || value === '') return '';
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function escapeHtmlMultiline(value) {
  return escapeHtml(value).replace(/\n/g, '<br>');
}

// Strips CR/LF so user input can never inject extra mail headers, and caps the
// length so a subject line cannot be abused as free advertising space.
export function sanitizeSubject(value, maxLength = 120) {
  return String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, maxLength);
}

// Practical address check: common local-part characters, then a dotted domain
// whose labels are alphanumeric/hyphen and cannot start or end with a hyphen.
// Rejects forms like "a@b..c" and "a@b.c>".
export const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

// Reads the named text fields from a multipart body, enforcing a per-field
// length cap. Returns { values, errors }.
export function readFormFields(formData, limits) {
  const values = {};
  const errors = [];

  for (const [field, maxLength] of Object.entries(limits)) {
    const raw = formData.get(field);
    if (raw === null) {
      values[field] = '';
      continue;
    }
    if (typeof raw !== 'string') {
      errors.push(`${field} must be plain text`);
      continue;
    }
    const trimmed = raw.trim();
    if (trimmed.length > maxLength) {
      errors.push(`${field} must be at most ${maxLength} characters`);
      continue;
    }
    values[field] = trimmed;
  }

  return { values, errors };
}

// A field no human can see and no browser will autofill. Real submissions leave
// it empty; naive bots fill every input they find.
export function isHoneypotTripped(formData, field = 'bot_field') {
  const value = formData.get(field);
  return typeof value === 'string' && value.trim() !== '';
}

// Sends through Resend and normalises failures to a 502 rather than a 500.
export async function sendResendEmail(env, payload, label) {
  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured.');
    return { ok: false, status: 503 };
  }

  let response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error(`${label}: could not reach Resend.`, error);
    return { ok: false, status: 502 };
  }

  if (!response.ok) {
    const detail = await response.text();
    console.error(`${label}: Resend rejected the request.`, response.status, detail);
    return { ok: false, status: 502 };
  }

  return { ok: true, status: 200 };
}

// Returns the parsed FormData, or null when the body is not multipart.
export async function readMultipart(request) {
  try {
    return await request.formData();
  } catch (error) {
    console.error('Could not parse multipart body.', error);
    return null;
  }
}
