// Cloudflare D1 Database Client
// Used in Pages Functions

// Product operations
export async function getProducts(db, options = {}) {
  let sql = 'SELECT * FROM products';
  const params = [];
  
  if (options?.category) {
    sql += ' WHERE category = ?';
    params.push(options.category);
  }
  
  if (options?.status) {
    sql += params.length ? ' AND' : ' WHERE';
    sql += ' status = ?';
    params.push(options.status);
  }
  
  sql += ' ORDER BY created_at DESC';
  
  const result = await db.prepare(sql).bind(...params).all();
  return result.results;
}

export async function getProductBySlug(db, slug) {
  const result = await db.prepare('SELECT * FROM products WHERE slug = ?').bind(slug).first();
  return result;
}

export async function createProduct(db, product) {
  const sql = `
    INSERT INTO products (slug, name, description, short_description, price, original_price, category, stock, status, images, specs)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const result = await db.prepare(sql).bind(
    product.slug,
    product.name,
    product.description || null,
    product.short_description || null,
    product.price || null,
    product.original_price || null,
    product.category || null,
    product.stock || 0,
    product.status || 'draft',
    JSON.stringify(product.images || []),
    JSON.stringify(product.specs || {})
  ).run();
  
  return result;
}

export async function updateProduct(db, slug, product) {
  const fields = [];
  const values = [];
  
  if (product.name !== undefined) { fields.push('name = ?'); values.push(product.name); }
  if (product.description !== undefined) { fields.push('description = ?'); values.push(product.description); }
  if (product.short_description !== undefined) { fields.push('short_description = ?'); values.push(product.short_description); }
  if (product.price !== undefined) { fields.push('price = ?'); values.push(product.price); }
  if (product.original_price !== undefined) { fields.push('original_price = ?'); values.push(product.original_price); }
  if (product.category !== undefined) { fields.push('category = ?'); values.push(product.category); }
  if (product.stock !== undefined) { fields.push('stock = ?'); values.push(product.stock); }
  if (product.status !== undefined) { fields.push('status = ?'); values.push(product.status); }
  if (product.images !== undefined) { fields.push('images = ?'); values.push(JSON.stringify(product.images)); }
  if (product.specs !== undefined) { fields.push('specs = ?'); values.push(JSON.stringify(product.specs)); }
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(slug);
  
  const sql = `UPDATE products SET ${fields.join(', ')} WHERE slug = ?`;
  const result = await db.prepare(sql).bind(...values).run();
  
  return result;
}

export async function deleteProduct(db, slug) {
  const result = await db.prepare('DELETE FROM products WHERE slug = ?').bind(slug).run();
  return result;
}

// Category operations
export async function getCategories(db) {
  const result = await db.prepare('SELECT * FROM categories ORDER BY sort_order').all();
  return result.results;
}

export async function createCategory(db, category) {
  const result = await db.prepare(
    'INSERT INTO categories (slug, name, description, sort_order) VALUES (?, ?, ?, ?)'
  ).bind(category.slug, category.name, category.description || null, category.sort_order || 0).run();
  
  return result;
}

export async function updateCategory(db, slug, category) {
  const fields = [];
  const values = [];
  
  if (category.name !== undefined) { fields.push('name = ?'); values.push(category.name); }
  if (category.description !== undefined) { fields.push('description = ?'); values.push(category.description); }
  if (category.sort_order !== undefined) { fields.push('sort_order = ?'); values.push(category.sort_order); }
  if (category.status !== undefined) { fields.push('status = ?'); values.push(category.status); }
  
  values.push(slug);
  
  const sql = `UPDATE categories SET ${fields.join(', ')} WHERE slug = ?`;
  const result = await db.prepare(sql).bind(...values).run();
  
  return result;
}

// Post operations
export async function getPosts(db, options = {}) {
  let sql = 'SELECT * FROM posts';
  const params = [];
  
  if (options?.status) {
    sql += ' WHERE status = ?';
    params.push(options.status);
  }
  
  if (options?.category) {
    sql += params.length ? ' AND' : ' WHERE';
    sql += ' category = ?';
    params.push(options.category);
  }
  
  sql += ' ORDER BY created_at DESC';
  
  const result = await db.prepare(sql).bind(...params).all();
  return result.results;
}

export async function getPostBySlug(db, slug) {
  const result = await db.prepare('SELECT * FROM posts WHERE slug = ?').bind(slug).first();
  return result;
}

export async function createPost(db, post) {
  const sql = `
    INSERT INTO posts (slug, title, excerpt, content, category, cover_image, status, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  const result = await db.prepare(sql).bind(
    post.slug,
    post.title,
    post.excerpt || null,
    post.content || null,
    post.category || null,
    post.cover_image || null,
    post.status || 'draft',
    post.status === 'published' ? new Date().toISOString() : null
  ).run();
  
  return result;
}

export async function updatePost(db, slug, post) {
  const fields = [];
  const values = [];
  
  if (post.title !== undefined) { fields.push('title = ?'); values.push(post.title); }
  if (post.excerpt !== undefined) { fields.push('excerpt = ?'); values.push(post.excerpt); }
  if (post.content !== undefined) { fields.push('content = ?'); values.push(post.content); }
  if (post.category !== undefined) { fields.push('category = ?'); values.push(post.category); }
  if (post.cover_image !== undefined) { fields.push('cover_image = ?'); values.push(post.cover_image); }
  if (post.status !== undefined) { 
    fields.push('status = ?'); 
    values.push(post.status);
    if (post.status === 'published') {
      fields.push('published_at = ?');
      values.push(new Date().toISOString());
    }
  }
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(slug);
  
  const sql = `UPDATE posts SET ${fields.join(', ')} WHERE slug = ?`;
  const result = await db.prepare(sql).bind(...values).run();
  
  return result;
}

export async function deletePost(db, slug) {
  const result = await db.prepare('DELETE FROM posts WHERE slug = ?').bind(slug).run();
  return result;
}
