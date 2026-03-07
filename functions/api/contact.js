// Cloudflare Pages Function - Contact Form Handler
// Uses Resend API to send emails

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const formData = await request.formData();
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      inquiry: formData.get('inquiry'),
      message: formData.get('message'),
    };

    // 验证必填字段
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: 'Please fill in all required fields' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // 邮箱格式验证
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

    // 检查环境变量
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

    // 使用 Resend 发送邮件
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'EYRYA Website <support@eyrya.com>',
        to: env.CONTACT_EMAIL || 'support@eyrya.com',
        subject: `Contact Form: ${data.inquiry || 'General Inquiry'} from ${data.name}`,
        reply_to: data.email,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Type:</strong> ${escapeHtml(data.inquiry || 'N/A')}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully! We will reply soon.' }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send message. Please try again or email support@eyrya.com directly.' }),
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

// 简单的 HTML 转义函数，防止 XSS
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
