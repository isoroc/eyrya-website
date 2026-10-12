// Cloudflare Pages Function - Support / Order Tracking Request Handler
// Sends through the Resend API.
import {
  EMAIL_PATTERN,
  escapeHtml,
  escapeHtmlMultiline,
  isHoneypotTripped,
  jsonResponse,
  preflightResponse,
  readFormFields,
  readMultipart,
  resolveCorsHeaders,
  sanitizeSubject,
  sendResendEmail,
} from '../_shared.js';

const FIELD_LIMITS = {
  orderNumber: 60,
  email: 254,
  message: 5000,
};

export async function onRequestPost(context) {
  const { request, env } = context;
  const corsHeaders = resolveCorsHeaders(request);

  const formData = await readMultipart(request);
  if (!formData) {
    return jsonResponse({ error: 'Expected a multipart/form-data submission' }, 400, corsHeaders);
  }

  if (isHoneypotTripped(formData)) {
    console.warn('Support form: honeypot field was filled; dropping submission.');
    return jsonResponse({ success: true }, 200, corsHeaders);
  }

  const { values, errors } = readFormFields(formData, FIELD_LIMITS);
  if (errors.length > 0) {
    return jsonResponse({ error: 'Validation failed', details: errors }, 400, corsHeaders);
  }

  if (!values.orderNumber || !values.email) {
    return jsonResponse({ error: 'Please fill in all required fields' }, 400, corsHeaders);
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    return jsonResponse({ error: 'Please enter a valid email address' }, 400, corsHeaders);
  }

  const result = await sendResendEmail(env, {
    from: 'EYRYA Website <support@eyrya.com>',
    to: env.SUPPORT_EMAIL || 'support@eyrya.com',
    subject: sanitizeSubject(`Order Tracking Request: ${values.orderNumber}`),
    reply_to: values.email,
    html: `
      <h2>Support Request</h2>
      <p><strong>Order Number:</strong> ${escapeHtml(values.orderNumber)}</p>
      <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtmlMultiline(values.message || '')}</p>
    `,
  }, 'Support form');

  if (!result.ok) {
    const message = result.status === 503
      ? 'Server configuration error'
      : 'Failed to submit request. Please email support@eyrya.com directly.';
    return jsonResponse({ error: message }, result.status, corsHeaders);
  }

  return jsonResponse({ success: true }, 200, corsHeaders);
}

export async function onRequest(context) {
  const { request } = context;
  const corsHeaders = resolveCorsHeaders(request);

  if (request.method === 'OPTIONS') {
    return preflightResponse(corsHeaders);
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405, { ...corsHeaders, Allow: 'POST, OPTIONS' });
  }

  return onRequestPost(context);
}
