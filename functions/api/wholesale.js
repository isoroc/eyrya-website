export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const formData = await request.formData();
    const data = {
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      quantity: formData.get('quantity'),
      businessType: formData.get('businessType'),
      message: formData.get('message'),
    };

    if (!data.name || !data.company || !data.email || !data.quantity) {
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
        from: 'EYRYA Website <wholesale@eyrya.com>',
        to: env.WHOLESALE_EMAIL || 'wholesale@eyrya.com',
        subject: `Wholesale Inquiry: ${data.quantity} units from ${data.company}`,
        reply_to: data.email,
        html: `
          <h2>New Wholesale Inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Quantity:</strong> ${escapeHtml(data.quantity)}</p>
          <p><strong>Business Type:</strong> ${escapeHtml(data.businessType || 'N/A')}</p>
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
      JSON.stringify({ success: true, message: 'Request sent! We will reply within 24 hours.' }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Wholesale form error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send request. Please email wholesale@eyrya.com directly.' }),
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