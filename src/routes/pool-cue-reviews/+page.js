import { getAllPosts } from '$lib/posts.js';

const CUE_SLUGS = [
  'best-pool-cues-for-beginners',
  'best-pool-cues-under-100',
  'best-pool-cues-for-the-money',
  'best-brands-of-pool-cues',
  'how-much-does-a-good-pool-cue-cost',
  'low-deflection-pool-cues',
  'mcdermott-cues',
  'pool-cue-anatomy',
  'pool-cue-shaft-taper-explained',
  'pool-cue-wrap-vs-no-wrap-which-is-better',
  'proper-cue-length',
  'does-pool-cue-weight-matter',
  'break-cue-vs-playing-cue',
  'break-cue-vs-playing-cue-whats-the-difference',
  'collapsar-cxl500-review',
  'purex-technology-pool-cue-review',
  'viking-valhalla-100-series-review',
  'are-viper-pool-cues-any-good-what-you-need-to-know',
  'are-viking-pool-cues-any-good',
  'players-pool-cues-all-your-questions-answered',
  'are-screw-on-pool-cue-tips-any-good',
  'are-pool-cues-allowed-on-airplanes',
  'can-snooker-cues-be-used-for-pool',
  'how-long-does-a-pool-cue-tip-last',
  'what-cue-tips-do-the-pros-use',
  'what-size-cue-tip-do-the-pros-use',
  'soft-vs-hard-pool-cue-tips-whats-the-difference',
  'what-is-a-pro-taper-pool-cue',
  'how-to-hold-a-pool-cue-a-simple-guide-for-beginners',
  'what-is-english-in-pool-a-simple-explanation',
  'best-pool-chalk',
  'what-is-pool-chalk-made-of',
  'does-pool-chalk-color-matter',
  'best-pool-cue-cases',
  'wood-fiberglass-graphite-cues',
  'why-do-pool-cues-warp-and-how-to-prevent-it',
];

export function load() {
  const all = getAllPosts();
  const posts = all.filter(p => CUE_SLUGS.includes(p.slug));
  return { posts };
}
