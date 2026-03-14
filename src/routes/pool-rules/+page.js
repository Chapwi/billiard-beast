import { getAllPosts } from '$lib/posts.js';

const RULES_SLUGS = [
  'how-to-play-pool-the-beginners-guide',
  '8-ball-pool-rules-the-simple-version',
  'how-to-play-9-ball-9-ball-rules-explained',
  'how-to-play-10-ball-pool-rules-and-gameplay',
  'how-to-play-cut-throat-pool',
  'how-to-play-bank-pool',
  'how-to-play-3-ball-pool',
  '3-player-pool-games',
  'how-to-play-pool-by-yourself-pool-games-you-can-play-alone',
  'billiard-games',
  'bumper-pool-all-your-questions-answered',
  'how-to-rack-pool-balls',
  'pool-rules-what-happens-if-you-hit-your-opponents-ball-in',
  'do-you-get-two-shots-on-the-8-ball',
  'what-happens-if-you-scratch-on-the-8-ball',
  'what-is-a-scratch-in-pool',
  'snooker-vs-pool-comparison',
  'is-snooker-harder-than-pool',
  'how-many-balls-are-used-in-pool',
  'billiard-ball-colors',
  'why-do-pool-balls-have-numbers',
];

export function load() {
  const all = getAllPosts();
  const posts = all.filter(p => RULES_SLUGS.includes(p.slug));
  return { posts };
}
