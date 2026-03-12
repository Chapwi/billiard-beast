import { getAllPosts } from '$lib/posts.js';

const SITE_URL = 'https://billiardbeast.com';

export async function GET() {
  const posts = getAllPosts();

  const pages = [
    {
      url: `${SITE_URL}/`,
      lastmod: '2026-03-11',
      changefreq: 'weekly',
      priority: '1.0'
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/${post.slug}/`,
      lastmod: post.dateModified || post.date || '2026-03-11',
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
