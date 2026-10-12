// Cloudflare Pages Function - Wholesale Inquiry Handler
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
  name: 120,
  company: 160,
  email: 254,
  quantity: 40,
  businessType: 60,
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
    console.warn('Wholesale form: honeypot field was filled; dropping submission.');
    return jsonResponse({ success: true, message: 'Request sent! We will reply within 24 hours.' }, 200, corsHeaders);
  }

  const { values, errors } = readFormFields(formData, FIELD_LIMITS);
  if (errors.length > 0) {
    return jsonResponse({ error: 'Validation failed', details: errors }, 400, corsHeaders);
  }

  if (!values.name || !values.company || !values.email || !values.quantity) {
    return jsonResponse({ error: 'Please fill in all required fields' }, 400, corsHeaders);
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    return jsonResponse({ error: 'Please enter a valid email address' }, 400, corsHeaders);
  }

  const result = await sendResendEmail(env, {
    from: 'EYRYA Website <wholesale@eyrya.com>',
    to: env.WHOLESALE_EMAIL || 'wholesale@eyrya.com',
    subject: sanitizeSubject(`Wholesale Inquiry: ${values.quantity} units from ${values.company}`),
    reply_to: values.email,
    html: `
      <h2>New Wholesale Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(values.company)}</p>
      <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
      <p><strong>Quantity:</strong> ${escapeHtml(values.quantity)}</p>
      <p><strong>Business Type:</strong> ${escapeHtml(values.businessType || 'N/A')}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtmlMultiline(values.message || '')}</p>
    `,
  }, 'Wholesale form');

  if (!result.ok) {
    const message = result.status === 503
      ? 'Server configuration error'
      : 'Failed to send request. Please email wholesale@eyrya.com directly.';
    return jsonResponse({ error: message }, result.status, corsHeaders);
  }

  return jsonResponse(
    { success: true, message: 'Request sent! We will reply within 24 hours.' },
    200,
    corsHeaders,
  );
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
