/**
 * Post loader utility for BilliardBeast SvelteKit
 * Imports all .md files from src/lib/posts/ via Vite's import.meta.glob
 */

// Eagerly import all post metadata (frontmatter only)
const postModules = import.meta.glob('./posts/*.md', { eager: true });

/**
 * Get all posts as an array, sorted by date descending
 */
export function getAllPosts() {
  return Object.entries(postModules)
    .map(([path, mod]) => {
      const slug = path.replace('./posts/', '').replace('.md', '');
      const meta = mod.metadata || {};
      return { slug, ...meta };
    })
    .filter((p) => p.title)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a single post by slug (metadata only — content rendered via SvelteKit route)
 */
export function getPost(slug) {
  const key = `./posts/${slug}.md`;
  const mod = postModules[key];
  if (!mod) return null;
  return { slug, ...(mod.metadata || {}) };
}
