import { json } from '@sveltejs/kit';
import { getPost, getAllPosts } from '$lib/posts.js';

const SITE_URL = 'https://billiardbeast.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/billiard-beast-logo-2.webp`;
const AUTHOR = { '@type': 'Person', name: 'Joe', url: SITE_URL };
const PUBLISHER = {
  '@type': 'Organization',
  name: 'BilliardBeast',
  logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE }
};

function buildArticleSchema(post, url) {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description || '',
      image: post.image || DEFAULT_IMAGE,
      datePublished: post.date,
      dateModified: post.dateModified || post.date,
      author: AUTHOR,
      publisher: PUBLISHER,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url }
    }
  ];

  // Add FAQPage schema if article has faqs in frontmatter
  if (post.faqs && post.faqs.length > 0) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      }))
    });
  }

  // Add ItemList schema for ranked/listicle articles (best-of, top picks)
  if (post.items && post.items.length > 0) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: post.title,
      numberOfItems: post.items.length,
      itemListElement: post.items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: item.url || url
      }))
    });
  }

  // Add Product schema for individual product reviews
  if (post.product) {
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: post.product.name,
      brand: { '@type': 'Brand', name: post.product.brand || '' },
      description: post.product.description || post.description || ''
    };
    if (post.product.price) {
      productSchema.offers = {
        '@type': 'Offer',
        price: post.product.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      };
    }
    if (post.product.rating) {
      productSchema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: post.product.rating,
        bestRating: '5',
        worstRating: '1',
        ratingCount: post.product.ratingCount || 1
      };
    }
    schema.push(productSchema);
  }

  return schema;
}

function buildOrganizationSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BilliardBeast',
      url: SITE_URL,
      logo: DEFAULT_IMAGE,
      description: 'Activate Beast-Mode on Everything Billiards'
    }
  ];
}

export async function GET({ request }) {
  const referrer = request.headers.get('referrer') || '';

  let slug = '';
  try {
    const url = new URL(referrer);
    const parts = url.pathname.replace(/^\/|\/$/g, '').split('/');
    slug = parts[0] || '';
  } catch {
    slug = '';
  }

  // Homepage or no slug
  if (!slug) {
    return json({
      title: 'BilliardBeast — Pool Tables, Cues & Billiards Guides',
      image: DEFAULT_IMAGE,
      description: 'Your complete guide to pool tables, cues, and billiards. Expert reviews, buying guides, and game rules — activate beast-mode on everything billiards.',
      schema: buildOrganizationSchema()
    });
  }

  // Try to load the post
  try {
    const post = await getPost(slug);
    if (!post) throw new Error('not found');

    const pageUrl = `${SITE_URL}/${slug}/`;
    return json({
      title: post.title,
      image: post.image || DEFAULT_IMAGE,
      description: post.description || '',
      schema: buildArticleSchema(post, pageUrl)
    });
  } catch {
    return json({
      title: 'BilliardBeast — Pool Tables, Cues & Billiards Guides',
      image: DEFAULT_IMAGE,
      description: 'Activate Beast-Mode on Everything Billiards',
      schema: buildOrganizationSchema()
    });
  }
}
