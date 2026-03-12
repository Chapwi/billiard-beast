import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params;

  try {
    const post = await import(`../../lib/posts/${slug}.md`);
    return {
      content: post.default,
      meta: { slug, ...(post.metadata || {}) }
    };
  } catch {
    throw error(404, `Article not found: ${slug}`);
  }
}
