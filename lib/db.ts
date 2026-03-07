// Cloudflare D1 Database Client
// 在 Pages Functions 中使用

export interface Product {
  id?: number;
  slug: string;
  name: string;
  description?: string;
  short_description?: string;
  price?: number;
  original_price?: number;
  category?: string;
  stock?: number;
  status?: 'active' | 'inactive' | 'draft';
  images?: string[];
  specs?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id?: number;
  slug: string;
  name: string;
  description?: string;
  sort_order?: number;
  status?: 'active' | 'inactive';
}

export interface Post {
  id?: number;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  cover_image?: string;
  status?: 'draft' | 'published';
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

// 产品相关操作
export async function getProducts(db: D1Database, options?: { category?: string; status?: string }) {
  let sql = 'SELECT * FROM products';
  const params: (string | number)[] = [];
  
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
  return result.results as Product[];
}

export async function getProductBySlug(db: D1Database, slug: string) {
  const result = await db.prepare('SELECT * FROM products WHERE slug = ?').bind(slug).first();
  return result as Product | null;
}

export async function createProduct(db: D1Database, product: Product) {
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

export async function updateProduct(db: D1Database, slug: string, product: Partial<Product>) {
  const fields: string[] = [];
  const values: (string | number | null)[] = [];
  
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

export async function deleteProduct(db: D1Database, slug: string) {
  const result = await db.prepare('DELETE FROM products WHERE slug = ?').bind(slug).run();
  return result;
}

// 分类相关操作
export async function getCategories(db: D1Database) {
  const result = await db.prepare('SELECT * FROM categories ORDER BY sort_order').all();
  return result.results as Category[];
}

export async function createCategory(db: D1Database, category: Category) {
  const result = await db.prepare(
    'INSERT INTO categories (slug, name, description, sort_order) VALUES (?, ?, ?, ?)'
  ).bind(category.slug, category.name, category.description || null, category.sort_order || 0).run();
  
  return result;
}

export async function updateCategory(db: D1Database, slug: string, category: Partial<Category>) {
  const fields: string[] = [];
  const values: (string | number | null)[] = [];
  
  if (category.name !== undefined) { fields.push('name = ?'); values.push(category.name); }
  if (category.description !== undefined) { fields.push('description = ?'); values.push(category.description); }
  if (category.sort_order !== undefined) { fields.push('sort_order = ?'); values.push(category.sort_order); }
  if (category.status !== undefined) { fields.push('status = ?'); values.push(category.status); }
  
  values.push(slug);
  
  const sql = `UPDATE categories SET ${fields.join(', ')} WHERE slug = ?`;
  const result = await db.prepare(sql).bind(...values).run();
  
  return result;
}

// 博客文章相关操作
export async function getPosts(db: D1Database, options?: { status?: string; category?: string }) {
  let sql = 'SELECT * FROM posts';
  const params: (string | number)[] = [];
  
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
  return result.results as Post[];
}

export async function getPostBySlug(db: D1Database, slug: string) {
  const result = await db.prepare('SELECT * FROM posts WHERE slug = ?').bind(slug).first();
  return result as Post | null;
}

export async function createPost(db: D1Database, post: Post) {
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

export async function updatePost(db: D1Database, slug: string, post: Partial<Post>) {
  const fields: string[] = [];
  const values: (string | null)[] = [];
  
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

export async function deletePost(db: D1Database, slug: string) {
  const result = await db.prepare('DELETE FROM posts WHERE slug = ?').bind(slug).run();
  return result;
}
