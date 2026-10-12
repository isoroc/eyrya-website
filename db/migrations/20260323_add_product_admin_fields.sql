-- SUPERSEDED - DO NOT RUN against a database created from db/schema.sql.
--
-- Every column added here (tagline, is_bestseller, rating, reviews, sold,
-- features, faq) is already defined in db/schema.sql, so executing this file on
-- a current database fails with "duplicate column name". It also does not add
-- the other columns the Functions use (short_description, specs, images, stock,
-- status, original_price), so it cannot bring an older database up to date
-- either.
--
-- db/schema.sql is the single source of truth for the schema:
--   npx wrangler d1 execute eyrya-db --file=./db/schema.sql
--
-- This file is kept only as a historical record.
ALTER TABLE products ADD COLUMN tagline TEXT;
ALTER TABLE products ADD COLUMN is_bestseller INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN rating DECIMAL(2,1) DEFAULT 5.0;
ALTER TABLE products ADD COLUMN reviews INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN sold INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN features TEXT;
ALTER TABLE products ADD COLUMN faq TEXT;
