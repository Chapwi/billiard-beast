import { getAllPosts } from '$lib/posts.js';

export async function load() {
  const posts = getAllPosts();
  return { posts };
}
