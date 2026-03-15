<script>
  import { getAllPosts } from '$lib/posts.js';

  export let data;
  $: meta    = data.meta || {};
  $: Content = data.content;

  // Related posts for sidebar (exclude current slug, take first 4)
  const allPosts = getAllPosts();
  $: related = allPosts.filter(p => p.slug !== meta.slug).slice(0, 4);

  function fmtDate(d) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  // Reading time estimate
  $: readTime = (() => {
    if (!meta.description) return '5 min read';
    const wpm = 225;
    const words = (meta.description || '').split(' ').length * 20; // rough article estimate
    return Math.max(3, Math.round(words / wpm)) + ' min read';
  })();

</script>

<article class="article-page">

  <!-- ─── ARTICLE HEADER ─── -->
  <header class="article-header">
    <div class="article-header__inner">
      <!-- Meta row: category + read time | updated date -->
      <div class="article-meta-row">
        <div class="article-meta-left">
          <span class="pill">Billiards</span>
          <span class="pill pill--muted">{readTime}</span>
        </div>
        {#if meta.dateModified || meta.date}
          <div class="article-meta-right">
            <span class="updated-label">Updated</span>
            <span class="pill pill--date">{fmtDate(meta.dateModified || meta.date)}</span>
          </div>
        {/if}
      </div>

      <!-- Title block -->
      <div class="article-title-block">
        <div class="article-title-col">
          <h1 class="article-title">{meta.title}</h1>
        </div>
        <!-- Author -->
        <div class="article-author">
          <img
            src="/images/joe-masked.webp"
            alt="Joe"
            class="author-avatar"
            width="36"
            height="36"
            loading="lazy"
            onerror="this.style.display='none'"
          />
          <span class="author-name">Joe</span>
        </div>
      </div>
    </div>
  </header>

  <!-- ─── HERO IMAGE ─── -->
  {#if meta.image}
    <div class="article-hero">
      <img src={meta.image} alt={meta.title} loading="eager" />
      {#if meta.description}
        <div class="article-hero__caption">
          <span class="drop-cap">{meta.description[0]}</span>{meta.description.slice(1)}
        </div>
      {/if}
    </div>
  {/if}

  <!-- ─── TWO-COLUMN LAYOUT ─── -->
  <div class="article-body-wrap">

    <!-- Left column: article content -->
    <div class="article-content">

      <!-- MDsvex renders here -->
      <div class="prose">
        <svelte:component this={Content} />
      </div>

      <!-- ─── AFFILIATE CTA BOX (monetization) ─── -->
      <div class="affiliate-cta">
        <div class="affiliate-cta__icon">🎱</div>
        <div class="affiliate-cta__body">
          <strong>Ready to level up your game?</strong>
          <p>Check out our top-rated gear picks — selected and reviewed by billiards enthusiasts.</p>
        </div>
        <a href="https://www.amazon.com/?tag=billiardbeast-20" target="_blank" rel="noopener noreferrer nofollow" class="affiliate-cta__btn">
          Shop on Amazon →
        </a>
      </div>

      <!-- In-content ad (end of article) -->
      <div class="ad-slot ad-slot--inline" aria-label="Advertisement">
        <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-5746515442496455"
          data-ad-slot="auto"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>

    </div><!-- /article-content -->

    <!-- Right sidebar -->
    <aside class="article-sidebar">
      <!-- Ad slot: sidebar top -->
      <div class="ad-slot ad-slot--sidebar" aria-label="Advertisement">
        <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-5746515442496455"
          data-ad-slot="auto"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>

      <!-- Related posts -->
      <div class="sidebar-section">
        <h2 class="sidebar-heading">Popular</h2>
        <div class="sidebar-posts">
          {#each related as post}
            <a href="/{post.slug}/" class="sidebar-post-card">
              {#if post.image}
                <div class="sidebar-post-card__img">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <div class="sidebar-post-card__overlay">
                    <span class="sidebar-post-card__title">{post.title}</span>
                    <span class="sidebar-post-card__arrow">↗</span>
                  </div>
                </div>
              {:else}
                <div class="sidebar-post-card__text">
                  <span class="sidebar-post-card__title sidebar-post-card__title--plain">{post.title}</span>
                </div>
              {/if}
              {#if post.description}
                <p class="sidebar-post-card__desc">{post.description.slice(0, 80)}…</p>
              {/if}
            </a>
          {/each}
        </div>
      </div>

      <!-- Sidebar ad (sticky) -->
      <div class="ad-slot ad-slot--sidebar sidebar-sticky" aria-label="Advertisement">
        <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-5746515442496455"
          data-ad-slot="auto"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>

    </aside>
  </div><!-- /article-body-wrap -->

</article>

<style>
  /* ─── Article page wrapper ─── */
  .article-page {
    background: var(--bg-dark);
    min-height: 60vh;
  }

  /* ─── Header ─── */
  .article-header {
    background: var(--bg-dark);
    padding: 2rem 1.5rem 0;
  }
  .article-header__inner {
    max-width: var(--max-w);
    margin: 0 auto;
  }

  /* Meta row */
  .article-meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .article-meta-left, .article-meta-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    padding: 0.2rem 0.75rem;
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: var(--radius-pill);
    font-family: var(--font-ui);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 0.03em;
  }
  .pill--muted {
    border-color: rgba(255,255,255,0.12);
    color: var(--text-muted);
  }
  .pill--date {
    background: rgba(255,255,255,0.08);
    border-color: rgba(255,255,255,0.15);
  }
  .updated-label {
    font-family: var(--font-ui);
    font-size: 0.75rem;
    color: var(--text-muted);
    letter-spacing: 0.04em;
  }

  /* Title block */
  .article-title-block {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    padding-bottom: 1.5rem;
  }
  .article-title-col { flex: 1; }
  .article-title {
    font-family: var(--font-body);
    font-weight: 800;
    font-size: clamp(2rem, 5vw, 3.25rem);
    line-height: 1.15;
    color: #fff;
    margin-bottom: 0.5rem;
  }
  /* Author */
  .article-author {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }
  .author-name {
    font-family: var(--font-ui);
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-muted);
    white-space: nowrap;
  }
  .author-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255,255,255,0.15);
  }

  /* ─── Hero image ─── */
  .article-hero {
    position: relative;
    max-width: var(--max-w);
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  .article-hero img {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: var(--radius-sm);
  }
  .article-hero__caption {
    position: absolute;
    bottom: 0;
    left: 1.5rem;
    right: 1.5rem;
    background: linear-gradient(to top, rgba(20,22,24,0.95) 0%, rgba(20,22,24,0.6) 70%, transparent 100%);
    padding: 2rem 1.5rem 1.25rem;
    color: #fff;
    font-size: 1rem;
    line-height: 1.6;
    border-radius: 0 0 var(--radius-sm) var(--radius-sm);
  }
  .drop-cap {
    font-family: var(--font-body);
    font-weight: 800;
    font-size: 3.5rem;
    line-height: 1;
    float: left;
    margin: 0.05em 0.12em 0 0;
    color: var(--orange);
  }

  /* ─── Two-column body ─── */
  .article-body-wrap {
    max-width: var(--max-w);
    margin: 0 auto;
    padding: 2rem 1.5rem 3rem;
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 3rem;
    align-items: start;
  }

  /* ─── Article content (prose) ─── */
  .article-content {}

  /* Ad slot — inline */
  .ad-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: var(--radius-sm);
  }
  .ad-slot:empty,
  .ad-slot:not(:has(ins[data-ad-status="filled"])) {
    display: none;
  }
  .ad-slot--inline {
    min-height: 0;
    margin: 1.75rem 0;
  }
  .ad-slot--sidebar { min-height: 0; margin-bottom: 1.5rem; }
  .ad-label {
    font-family: var(--font-ui);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    color: #3a3a3a;
    text-transform: uppercase;
  }

  /* Prose styles */
  :global(.prose p) {
    margin-bottom: 1.1rem;
    font-size: 1rem;
    line-height: 1.75;
    color: var(--text-primary);
  }
  :global(.prose h2) {
    font-family: var(--font-accent);
    font-weight: 900;
    font-style: italic;
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin: 2rem 0 0.85rem;
    line-height: 1.2;
  }
  :global(.prose h3) {
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--text-primary);
    margin: 1.5rem 0 0.65rem;
  }
  :global(.prose ul), :global(.prose ol) {
    margin: 0.75rem 0 1.1rem 1.5rem;
    color: var(--text-primary);
  }
  :global(.prose li) { margin-bottom: 0.4rem; line-height: 1.65; }
  :global(.prose a) {
    color: var(--orange);
    text-decoration: underline;
    text-decoration-color: rgba(242,101,34,0.4);
    text-underline-offset: 2px;
    transition: text-decoration-color var(--transition), color var(--transition);
  }
  :global(.prose a:hover) {
    color: #fff;
    text-decoration-color: rgba(255,255,255,0.5);
  }
  :global(.prose strong) { color: #fff; font-weight: 700; }
  :global(.prose em) { color: var(--text-muted); }
  :global(.prose blockquote) {
    border-left: 3px solid var(--orange);
    padding: 0.5rem 0 0.5rem 1.25rem;
    margin: 1.5rem 0;
    color: var(--text-muted);
    font-style: italic;
  }
  :global(.prose table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.9rem;
  }
  :global(.prose th) {
    background: var(--bg-card);
    color: #fff;
    font-weight: 700;
    text-align: left;
    padding: 0.65rem 0.85rem;
    border: 1px solid var(--border-dark);
  }
  :global(.prose td) {
    padding: 0.6rem 0.85rem;
    border: 1px solid var(--border-dark);
    color: var(--text-primary);
    vertical-align: top;
  }
  :global(.prose tr:nth-child(even) td) { background: rgba(255,255,255,0.03); }
  :global(.prose img) {
    width: 100%;
    border-radius: var(--radius-sm);
    margin: 1.5rem 0;
  }
  :global(.prose code) {
    background: var(--bg-card);
    padding: 0.15em 0.45em;
    border-radius: 3px;
    font-size: 0.88em;
    color: var(--orange);
  }

  /* ─── Product pick cards ─── */
  :global(.product-pick) {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-left: 3px solid var(--orange);
    border-radius: var(--radius-sm);
    padding: 1.5rem 1.5rem 1.25rem;
    margin: 1.75rem 0;
    position: relative;
  }
  :global(.product-pick h3) {
    font-family: var(--font-body);
    font-weight: 800;
    font-size: 1.2rem;
    color: #fff;
    margin: 0 0 0.75rem 0;
    line-height: 1.3;
  }
  :global(.product-pick__badge) {
    display: inline-block;
    font-family: var(--font-ui);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--orange);
    background: rgba(242,101,34,0.12);
    border: 1px solid rgba(242,101,34,0.3);
    border-radius: var(--radius-pill);
    padding: 0.2rem 0.7rem;
    margin-bottom: 0.65rem;
  }
  :global(.product-pick__specs) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }
  :global(.product-pick__specs span) {
    display: inline-block;
    font-family: var(--font-ui);
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--text-muted);
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-pill);
    padding: 0.18rem 0.6rem;
    letter-spacing: 0.02em;
  }
  :global(.product-pick__verdict) {
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--text-muted);
    font-style: italic;
    margin-bottom: 0.85rem;
    line-height: 1.5;
  }
  :global(.product-pick p) {
    font-size: 0.92rem;
    line-height: 1.7;
    color: var(--text-primary);
    margin-bottom: 0.85rem;
  }
  /* De-emphasize inline links inside cards so CTA is the clear action */
  :global(.prose .product-pick a:not(.product-pick__cta)) {
    color: var(--text-primary);
    text-decoration-color: rgba(255,255,255,0.15);
  }
  :global(.prose .product-pick a:not(.product-pick__cta):hover) {
    color: var(--orange);
    text-decoration-color: rgba(242,101,34,0.4);
  }
  :global(.prose .product-pick__cta) {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-ui);
    font-weight: 700;
    font-size: 0.82rem;
    color: #fff;
    background: var(--orange);
    padding: 0.55rem 1.2rem;
    border-radius: var(--radius-pill);
    text-decoration: none;
    text-decoration-color: transparent;
    margin-top: 0.5rem;
    transition: background var(--transition), transform var(--transition);
  }
  :global(.prose .product-pick__cta:hover) {
    background: var(--orange-dim);
    transform: translateY(-1px);
    text-decoration: none;
    text-decoration-color: transparent;
    color: #fff;
  }

  /* ─── Affiliate CTA box ─── */
  .affiliate-cta {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(135deg, rgba(242,101,34,0.12) 0%, rgba(242,101,34,0.05) 100%);
    border: 1px solid rgba(242,101,34,0.35);
    border-radius: var(--radius-md);
    padding: 1.25rem 1.5rem;
    margin: 2rem 0;
  }
  .affiliate-cta__icon { font-size: 2rem; flex-shrink: 0; }
  .affiliate-cta__body { flex: 1; }
  .affiliate-cta__body strong {
    display: block;
    font-size: 1rem;
    color: #fff;
    margin-bottom: 0.25rem;
  }
  .affiliate-cta__body p {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin: 0;
  }
  .affiliate-cta__btn {
    display: inline-block;
    flex-shrink: 0;
    background: var(--orange);
    color: #fff;
    font-family: var(--font-ui);
    font-weight: 700;
    font-size: 0.85rem;
    padding: 0.6rem 1.25rem;
    border-radius: var(--radius-pill);
    white-space: nowrap;
    transition: background var(--transition), transform var(--transition);
  }
  .affiliate-cta__btn:hover {
    background: var(--orange-dim);
    transform: translateY(-1px);
  }

  /* ─── Sidebar ─── */
  .article-sidebar { position: relative; }
  .sidebar-sticky {
    position: sticky;
    top: 88px; /* below header */
  }

  .sidebar-section { margin-bottom: 1.5rem; }
  .sidebar-heading {
    font-family: var(--font-body);
    font-weight: 800;
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-primary);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--orange);
    display: inline-block;
  }

  .sidebar-posts { display: flex; flex-direction: column; gap: 1rem; }

  .sidebar-post-card { display: block; transition: opacity var(--transition); }
  .sidebar-post-card:hover { opacity: 0.82; }

  .sidebar-post-card__img {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
    border-radius: var(--radius-sm);
    background: var(--bg-card);
    margin-bottom: 0.5rem;
  }
  .sidebar-post-card__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  .sidebar-post-card:hover .sidebar-post-card__img img { transform: scale(1.05); }

  .sidebar-post-card__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(20,22,24,0.9) 0%, rgba(20,22,24,0.2) 60%, transparent 100%);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0.75rem;
    gap: 0.5rem;
  }
  .sidebar-post-card__title {
    font-family: var(--font-accent);
    font-weight: 900;
    font-style: italic;
    font-size: 0.85rem;
    text-transform: uppercase;
    line-height: 1.2;
    color: #fff;
    letter-spacing: 0.02em;
  }
  .sidebar-post-card__title--plain {
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--text-primary);
    font-style: normal;
    text-transform: none;
  }
  .sidebar-post-card__arrow {
    color: var(--orange);
    font-size: 1rem;
    flex-shrink: 0;
  }
  .sidebar-post-card__text {
    padding: 0.5rem 0;
  }
  .sidebar-post-card__desc {
    font-size: 0.78rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0;
  }

  /* ─── Responsive ─── */
  @media (max-width: 1024px) {
    .article-body-wrap { grid-template-columns: 1fr 280px; gap: 2rem; }
  }
  @media (max-width: 768px) {
    .article-header { padding: 1rem 1rem 0; }
    .article-meta-row { margin-bottom: 0.5rem; }
    .article-title { font-size: 1.65rem; line-height: 1.2; margin-bottom: 0; }
    .article-title-block {
      flex-direction: column;
      gap: 0.5rem;
      padding-bottom: 0.75rem;
    }
    .article-hero { padding: 0 1rem; }
    .article-hero__caption { display: none; }
    .article-body-wrap { grid-template-columns: 1fr; padding: 1.25rem 1rem 2rem; }
    .article-sidebar { display: none; }
    .affiliate-cta { flex-direction: column; text-align: center; }
    :global(.prose h2) {
      text-transform: none;
      font-size: 1.15rem;
      margin: 1.5rem 0 0.65rem;
    }
    :global(.prose p) { font-size: 0.95rem; line-height: 1.7; }
    :global(.product-pick) { padding: 1.25rem 1rem 1rem; }
    :global(.product-pick h3) { font-size: 1.05rem; }
    :global(.product-pick__specs) { gap: 0.35rem; }
    :global(.product-pick__cta) { width: 100%; justify-content: center; }
  }
</style>
