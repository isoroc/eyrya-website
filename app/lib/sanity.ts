import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-07',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// Product queries
export async function getProducts() {
  const query = `*[_type == "product"] {
    _id,
    name,
    slug,
    description,
    shortDescription,
    price,
    category,
    subcategory,
    features,
    perfectFor,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    amazonLink,
    temuLink,
    status,
  }`;
  
  return sanityClient.fetch(query);
}

export async function getProductBySlug(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    shortDescription,
    price,
    category,
    subcategory,
    features,
    perfectFor,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    amazonLink,
    temuLink,
    status,
    faq,
  }`;
  
  return sanityClient.fetch(query, { slug });
}

export async function getProductsByCategory(category: string) {
  const query = `*[_type == "product" && category == $category] {
    _id,
    name,
    slug,
    description,
    shortDescription,
    price,
    category,
    subcategory,
    "mainImage": mainImage.asset->url,
    amazonLink,
    temuLink,
    status,
  }`;
  
  return sanityClient.fetch(query, { category });
}

// Blog/Ideas queries
export async function getIdeas() {
  const query = `*[_type == "idea"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    "coverImage": coverImage.asset->url,
    publishedAt,
    readTime,
  }`;
  
  return sanityClient.fetch(query);
}

export async function getIdeaBySlug(slug: string) {
  const query = `*[_type == "idea" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    category,
    "coverImage": coverImage.asset->url,
    publishedAt,
    readTime,
  }`;
  
  return sanityClient.fetch(query, { slug });
}

export async function getIdeasByCategory(category: string) {
  const query = `*[_type == "idea" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    "coverImage": coverImage.asset->url,
    publishedAt,
    readTime,
  }`;
  
  return sanityClient.fetch(query, { category });
}

// Categories
export async function getCategories() {
  const query = `*[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    "icon": icon.asset->url,
    color,
    productCount,
  }`;
  
  return sanityClient.fetch(query);
}

// Platform links
export async function getPlatforms() {
  const query = `*[_type == "platform"] | order(order asc) {
    _id,
    name,
    url,
    description,
    "logo": logo.asset->url,
    isActive,
  }`;
  
  return sanityClient.fetch(query);
}

// Site settings
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    siteName,
    tagline,
    description,
    socialLinks,
    contactEmail,
  }`;
  
  return sanityClient.fetch(query);
}
