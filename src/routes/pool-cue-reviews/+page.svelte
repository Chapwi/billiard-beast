<script>
  export let data;
  $: posts = data.posts || [];

  function fmtDate(d) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function truncate(str, n) {
    if (!str) return '';
    return str.length > n ? str.slice(0, n).trimEnd() + '…' : str;
  }
</script>

<svelte:head>
  <title>Pool Cue Reviews & Guides | BilliardBeast</title>
  <meta name="description" content="Pool cue reviews, buying guides, tip comparisons, shaft tapers, and everything you need to find the right cue for your game." />
</svelte:head>

<section class="category-hero">
  <h1>Pool Cues</h1>
  <p>Reviews, buying guides, cue tips, shafts, and accessories — find the right cue for your game and budget.</p>
</section>

<div class="category-grid">
  {#each posts as post}
    <a href="/{post.slug}/" class="category-card">
      {#if post.image}
        <div class="category-card__img">
          <img src={post.image} alt={post.title} loading="lazy" />
        </div>
      {/if}
      <div class="category-card__body">
        <h2>{post.title}</h2>
        <p>{truncate(post.description, 120)}</p>
        <span class="category-card__date">{fmtDate(post.dateModified || post.date)}</span>
      </div>
    </a>
  {/each}
</div>

<style>
  .category-hero {
    text-align: center;
    padding: 2.5rem 1rem 1.5rem;
    background: #141618;
    color: #fff;
  }
  .category-hero h1 {
    font-size: clamp(2rem, 6vw, 3.5rem);
    font-weight: 800;
    margin: 0 0 0.5rem;
    letter-spacing: -0.02em;
  }
  .category-hero p {
    font-size: 1.05rem;
    color: #b0b0b0;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 2rem 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .category-card {
    display: flex;
    flex-direction: column;
    background: var(--bg-card, #1a1c1e);
    border: 1px solid var(--border-dark, #2a2d30);
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .category-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }

  .category-card__img {
    aspect-ratio: 16/10;
    overflow: hidden;
    background: #111;
  }
  .category-card__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .category-card__body {
    padding: 1rem 1.2rem 1.2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .category-card__body h2 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    line-height: 1.3;
    color: var(--text-primary, #eee);
  }
  .category-card__body p {
    font-size: 0.9rem;
    color: var(--text-secondary, #999);
    line-height: 1.45;
    margin: 0 0 0.75rem;
    flex: 1;
  }
  .category-card__date {
    font-size: 0.78rem;
    color: var(--text-muted, #666);
  }

  @media (max-width: 640px) {
    .category-grid {
      grid-template-columns: 1fr;
      padding: 1rem;
      gap: 1rem;
    }
  }
</style>
