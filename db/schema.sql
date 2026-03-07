-- D1 数据库 Schema
-- 产品表
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  category TEXT,
  stock INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- active, inactive, draft
  images TEXT, -- JSON array of image keys
  specs TEXT, -- JSON object
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
