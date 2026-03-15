import { getAllPosts } from '$lib/posts.js';

const SITE_URL = 'https://billiardbeast.com';

export async function GET() {
  const posts = getAllPosts();

  // Find the most recent post date for homepage lastmod
  const latestPostDate = posts.length
    ? posts.reduce((latest, p) => {
        const d = p.dateModified || p.date || '2020-01-01';
        return d > latest ? d : latest;
      }, '2020-01-01')
    : new Date().toISOString().slice(0, 10);

  const pages = [
    // Homepage
    {
      url: `${SITE_URL}/`,
      lastmod: latestPostDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    // Static pages
    {
      url: `${SITE_URL}/about/`,
      lastmod: '2026-02-01',
      changefreq: 'monthly',
      priority: '0.3'
    },
    {
      url: `${SITE_URL}/privacy-policy/`,
      lastmod: '2026-02-01',
      changefreq: 'yearly',
      priority: '0.2'
    },
    {
      url: `${SITE_URL}/affiliate-disclosure/`,
      lastmod: '2026-02-01',
      changefreq: 'yearly',
      priority: '0.2'
    },
    // Category / hub pages
    {
      url: `${SITE_URL}/pool-table-reviews/`,
      lastmod: latestPostDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: `${SITE_URL}/pool-cue-reviews/`,
      lastmod: latestPostDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: `${SITE_URL}/pool-rules/`,
      lastmod: latestPostDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    // All articles
    ...posts.map((post) => ({
      url: `${SITE_URL}/${post.slug}/`,
      lastmod: post.dateModified || post.date || '2026-01-01',
      changefreq: 'monthly',
      priority: '0.8'
    }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600'
    }
  });
}
