export const prerender = false;

export async function load({ fetch, url }) {
  try {
    const res = await fetch('/api/schema', {
      headers: { referrer: url.href }
    });
    if (!res.ok) throw new Error('schema fetch failed');
    const n = await res.json();
    return {
      title: n.title || null,
      image: n.image || null,
      schema: n.schema || null,
      description: n.description || null,
      url
    };
  } catch {
    return { title: null, image: null, schema: null, description: null, url };
  }
}
