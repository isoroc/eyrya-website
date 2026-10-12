// Cloudflare Pages Function - Contact Form Handler
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
  email: 254,
  inquiry: 80,
  message: 5000,
};

export async function onRequestPost(context) {
  const { request, env } = context;
  const corsHeaders = resolveCorsHeaders(request);

  const formData = await readMultipart(request);
  if (!formData) {
    return jsonResponse({ error: 'Expected a multipart/form-data submission' }, 400, corsHeaders);
  }

  // Silently accept honeypot hits so bots do not learn they were filtered.
  if (isHoneypotTripped(formData)) {
    console.warn('Contact form: honeypot field was filled; dropping submission.');
    return jsonResponse({ success: true, message: 'Message sent successfully! We will reply soon.' }, 200, corsHeaders);
  }

  const { values, errors } = readFormFields(formData, FIELD_LIMITS);
  if (errors.length > 0) {
    return jsonResponse({ error: 'Validation failed', details: errors }, 400, corsHeaders);
  }

  if (!values.name || !values.email || !values.message) {
    return jsonResponse({ error: 'Please fill in all required fields' }, 400, corsHeaders);
  }

  if (!EMAIL_PATTERN.test(values.email)) {
    return jsonResponse({ error: 'Please enter a valid email address' }, 400, corsHeaders);
  }

  const result = await sendResendEmail(env, {
    from: 'EYRYA Website <contact@eyrya.com>',
    to: env.CONTACT_EMAIL || 'support@eyrya.com',
    // sanitizeSubject strips CR/LF and caps the length so the subject cannot be
    // used to inject extra mail headers.
    subject: sanitizeSubject(`Contact Form: ${values.inquiry || 'General Inquiry'} from ${values.name}`),
    reply_to: values.email,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
      <p><strong>Type:</strong> ${escapeHtml(values.inquiry || 'N/A')}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtmlMultiline(values.message)}</p>
    `,
  }, 'Contact form');

  if (!result.ok) {
    const message = result.status === 503
      ? 'Server configuration error'
      : 'Failed to send message. Please try again or email support@eyrya.com directly.';
    return jsonResponse({ error: message }, result.status, corsHeaders);
  }

  return jsonResponse(
    { success: true, message: 'Message sent successfully! We will reply soon.' },
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
