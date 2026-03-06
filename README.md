# EYRYA Website

A modern brand website for EYRYA, a fun lifestyle brand focused on party supplies, toys, sports fan gear and outdoor fun products.

## 🎯 Website Goal

Build brand trust, showcase products, and drive traffic to Amazon and Temu.

## 📁 Project Structure

```
eyrya-website/
├── app/
│   ├── components/       # Reusable components
│   ├── products/         # Products listing and detail pages
│   ├── ideas/            # Blog/Ideas pages
│   ├── where-to-buy/     # Where to Buy page
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── wholesale/        # Wholesale page
│   ├── lib/              # Utilities and API functions
│   ├── sanity/           # CMS schemas
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── public/               # Static assets
└── next.config.ts        # Next.js configuration
```

## 🚀 Pages

- **Home** (`/`) - Hero, Categories, Featured Product, Scenarios, Where to Buy, Ideas Preview
- **Products** (`/products`) - Product categories and featured products
- **Product Detail** (`/products/[slug]`) - Individual product pages
- **Where to Buy** (`/where-to-buy`) - Platform listings (Amazon, Temu)
- **Ideas** (`/ideas`) - Blog posts and inspiration
- **Ideas Detail** (`/ideas/[slug]`) - Individual blog posts
- **About** (`/about`) - Brand story and values
- **Contact** (`/contact`) - Contact form
- **Wholesale** (`/wholesale`) - B2B inquiry form

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io (headless CMS)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Sanity credentials

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔧 CMS Setup (Sanity)

1. Create a Sanity account at [sanity.io](https://sanity.io)
2. Create a new project
3. Copy the Project ID and API token
4. Add them to your `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

5. Deploy the schemas to your Sanity project (optional, for Studio access)

## 📝 Content Management

The website uses Sanity CMS for dynamic content. Main content types:

- **Products** - Product information, images, pricing, links
- **Categories** - Product categories
- **Ideas** - Blog posts and articles
- **Platforms** - Where to Buy platforms (Amazon, Temu, etc.)
- **Site Settings** - Global site configuration

## 🎨 Brand Colors

- Primary Pink: `#FF6B9D`
- Primary Orange: `#FF8C42`
- Primary Yellow: `#FFD93D`
- Primary Green: `#6BCB77`
- Primary Blue: `#4D96FF`
- Primary Purple: `#9B59B6`

## 🌐 Deployment

The site is configured for static export. Build output goes to the `dist` folder.

```bash
npm run build
```

Deploy the `dist` folder to your hosting platform (Vercel, Netlify, etc.)

## 📄 License

© 2024 EYRYA. All rights reserved.
