import { getAllPosts } from '$lib/posts.js';

const TABLE_SLUGS = [
  'pool-table-reviews',
  'best-pool-tables-for-small-spaces',
  'pool-tables-under-1000',
  'pool-table-cost',
  'standard-pool-table-size',
  'how-heavy-is-a-slate-pool-table-with-examples',
  'how-long-do-pool-tables-last',
  'how-far-does-a-pool-table-need-to-be-away-from-the-wall',
  'can-you-put-a-pool-table-in-a-12x12-room',
  'slate-vs-mdf-pool-table',
  'slate-vs-slatron-pool-table-whats-the-difference',
  'what-is-a-slatron-pool-table',
  'are-pool-tables-too-heavy-for-the-second-floor',
  'how-level-does-a-pool-table-need-to-be',
  'can-you-put-a-pool-table-on-vinyl-plank-flooring',
  'can-you-put-a-pool-table-on-carpet',
  'do-pool-tables-need-to-be-climate-controlled',
  'how-to-tell-if-a-pool-table-is-slate-or-wood',
  'can-you-move-a-pool-table-without-taking-it-apart',
  'how-to-move-a-pool-table-a-few-feet',
  'can-you-turn-a-pool-table-on-its-side',
  'are-mini-pool-tables-worth-it-a-complete-guide',
  'are-mdf-wood-pool-tables-any-good',
  'how-long-do-mdf-pool-tables-last',
  'how-much-weight-can-a-pool-table-hold',
  'how-to-set-up-a-pool-table',
  'how-to-clean-a-pool-table',
  'can-you-vacuum-a-pool-table',
  'pool-table-felt-guide',
  'whats-the-best-color-for-pool-table-felt',
  'how-long-does-pool-table-felt-last',
  'how-much-does-it-cost-to-refelt-a-pool-table',
  'can-you-iron-pool-table-felt',
  'is-pool-table-felt-glued-down',
  'is-a-6-foot-pool-table-too-small',
  'can-you-put-a-pool-table-in-a-mobile-home',
  'pool-table-in-the-garage-heres-what-you-need-to-know',
  'should-you-put-a-rug-under-a-pool-table',
  'should-you-leave-pool-balls-on-the-table',
  'how-does-a-pool-table-recognize-the-cue-ball',
  'what-are-the-dots-on-a-pool-table-for',
];

export function load() {
  const all = getAllPosts();
  const posts = all.filter(p => TABLE_SLUGS.includes(p.slug));
  return { posts };
}
