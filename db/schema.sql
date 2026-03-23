-- D1 数据库 Schema
-- 产品表
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  tagline TEXT, -- 标语/副标题
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  category TEXT,
  stock INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- active, inactive, draft
  is_bestseller INTEGER DEFAULT 0, -- 0 or 1
  rating DECIMAL(2,1) DEFAULT 5.0, -- 评分 0-5
  reviews INTEGER DEFAULT 0, -- 评论数
  sold INTEGER DEFAULT 0, -- 已售数量
  images TEXT, -- JSON array of image keys
  specs TEXT, -- JSON object: dimensions, weight, material, colors
  features TEXT, -- JSON array of feature strings
  faq TEXT, -- JSON array of {question, answer}
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 分类表
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active'
);

-- 博客文章表
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  cover_image TEXT,
  status TEXT DEFAULT 'draft', -- draft, published
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 插入默认分类
INSERT OR IGNORE INTO categories (slug, name, description, sort_order) VALUES
  ('party-supplies', 'Party Supplies', 'Party props and celebration accessories', 1),
  ('toys-play', 'Kids & Toys', 'Toys kids actually play with', 2),
  ('sports-fan-gear', 'Sports Fan Gear', 'Cheering accessories for real fans', 3),
  ('outdoor-fun', 'Outdoor & Camping', 'Gear for actual outdoor adventures', 4);
