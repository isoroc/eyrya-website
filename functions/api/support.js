// Cloudflare Pages Function - Support / Order Tracking Form Handler
// Uses Resend API to send emails

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const data = {
      orderNumber: formData.get('orderNumber'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    if (!data.orderNumber || !data.email) {
      return new Response(
        JSON.stringify({ error: 'Please fill in all required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (!env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not set');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'EYRYA Website <support@eyrya.com>',
        to: env.SUPPORT_EMAIL || 'support@eyrya.com',
        subject: `Order Tracking Request: ${data.orderNumber}`,
        reply_to: data.email,
        html: `
          <h2>Support Request</h2>
          <p><strong>Order Number:</strong> ${escapeHtml(data.orderNumber)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(data.message || '').replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Support form error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to submit request. Please email support@eyrya.com directly.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (context.request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  return onRequestPost(context);
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
