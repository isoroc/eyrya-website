// Admin API - 图片上传 (R2)
// Auth is enforced by functions/api/admin/_middleware.js before this handler runs.
import { jsonResponse } from './_auth.js';

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

// Only the object keys this endpoint creates may be deleted: a flat list of
// safe filename characters directly under products/.
const KEY_PATTERN = /^products\/[A-Za-z0-9._-]+$/;

function ascii(bytes, offset, length) {
  return String.fromCharCode(...bytes.slice(offset, offset + length));
}

// The declared Content-Type is attacker-controlled, so identify the format from
// the file's own magic bytes instead. SVG is deliberately unsupported: an SVG
// served from the images domain can execute script in the visitor's browser.
const SIGNATURES = [
  { ext: 'jpg', mime: 'image/jpeg', match: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: 'png', mime: 'image/png', match: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { ext: 'gif', mime: 'image/gif', match: (b) => ascii(b, 0, 4) === 'GIF8' },
  { ext: 'webp', mime: 'image/webp', match: (b) => ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 4) === 'WEBP' },
  { ext: 'avif', mime: 'image/avif', match: (b) => ascii(b, 4, 4) === 'ftyp' && ['avif', 'avis'].includes(ascii(b, 8, 4)) },
];

function detectImage(bytes) {
  return SIGNATURES.find((signature) => signature.match(bytes)) || null;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.IMAGES_BUCKET) {
    console.error('IMAGES_BUCKET is not bound.');
    return jsonResponse({ error: 'Image storage is not configured' }, 503);
  }

  if (!env.IMAGES_CUSTOM_DOMAIN) {
    console.error('IMAGES_CUSTOM_DOMAIN is not configured; uploads cannot return a usable URL.');
    return jsonResponse({ error: 'Image storage is not configured' }, 503);
  }

  let formData;
  try {
    formData = await request.formData();
  } catch (error) {
    console.error('Upload: could not parse multipart body.', error);
    return jsonResponse({ error: 'Expected a multipart/form-data upload' }, 400);
  }

  const file = formData.get('file');
  if (!file || typeof file === 'string') {
    return jsonResponse({ error: 'No file uploaded' }, 400);
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return jsonResponse({ error: `File is too large (limit ${MAX_UPLOAD_BYTES / 1024 / 1024} MB)` }, 413);
  }

  if (file.size === 0) {
    return jsonResponse({ error: 'File is empty' }, 400);
  }

  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const detected = detectImage(bytes);
    if (!detected) {
      return jsonResponse({ error: 'Unsupported image format. Use JPEG, PNG, GIF, WebP, or AVIF.' }, 415);
    }

    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 10);
    const key = `products/${timestamp}-${random}.${detected.ext}`;

    await env.IMAGES_BUCKET.put(key, bytes, {
      httpMetadata: {
        // The sniffed MIME type, never the client-supplied one.
        contentType: detected.mime,
        cacheControl: 'public, max-age=31536000, immutable',
      },
    });

    return jsonResponse({
      success: true,
      url: `https://${env.IMAGES_CUSTOM_DOMAIN}/${key}`,
      key,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return jsonResponse({ error: 'Upload failed' }, 500);
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  if (!env.IMAGES_BUCKET) {
    console.error('IMAGES_BUCKET is not bound.');
    return jsonResponse({ error: 'Image storage is not configured' }, 503);
  }

  if (!key) {
    return jsonResponse({ error: 'Key is required' }, 400);
  }

  // Without this check the endpoint is an arbitrary-object delete against the
  // whole bucket.
  if (!KEY_PATTERN.test(key)) {
    return jsonResponse({ error: 'Invalid key' }, 400);
  }

  try {
    const existing = await env.IMAGES_BUCKET.head(key);
    if (!existing) {
      return jsonResponse({ error: 'Image not found' }, 404);
    }

    await env.IMAGES_BUCKET.delete(key);
    return jsonResponse({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return jsonResponse({ error: 'Delete failed' }, 500);
  }
}

export async function onRequest() {
  // OPTIONS and auth are handled by _middleware.js.
  return jsonResponse({ error: 'Method not allowed' }, 405, { Allow: 'POST, DELETE, OPTIONS' });
}
