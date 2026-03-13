<script>
  export let data;
  $: posts = data.posts || [];

  // Featured = most recent post. Sidebar = next 4. Popular = next 4 after that.
  $: featured  = posts[0]  || null;
  $: sidebar   = posts.slice(1, 5);
  $: popular   = posts.slice(5, 9);
  $: remaining = posts.slice(9);

  function fmtDate(d) {
    if (!d) return '';
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function truncate(str, n) {
    if (!str) return '';
    return str.length > n ? str.slice(0, n).trimEnd() + '…' : str;
  }
</script>

<!-- ─── HERO BANNER ─── -->
<section class="hero-banner">
  <h1 class="hero-title">Pool Tables, Cues &amp; Billiard Guides</h1>
</section>

<!-- ─── MAIN CONTENT AREA ─── -->
<div class="home-wrap">

  <!-- Ad slot: top of content -->
  <div class="ad-slot ad-slot--horiz" aria-label="Advertisement">
    <ins class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-5746515442496455"
      data-ad-slot="auto"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  </div>

  <!-- ─── FEATURED + SIDEBAR ─── -->
  {#if featured}
    <div class="featured-row">
      <!-- Featured left -->
      <a href="/{featured.slug}/" class="featured-card">
        {#if featured.image}
          <div class="featured-card__img-wrap">
            <img src={featured.image} alt={featured.title} loading="eager" />
          </div>
        {/if}
        <div class="featured-card__body">
          <time class="post-date" datetime={featured.date}>{fmtDate(featured.date)}</time>
          <h2 class="featured-card__title">{featured.title}</h2>
          {#if featured.description}
            <p class="featured-card__desc">{truncate(featured.description, 130)}</p>
          {/if}
        </div>
      </a>

      <!-- Sidebar right -->
      <div class="sidebar-posts">
        {#each sidebar as post}
          <a href="/{post.slug}/" class="sidebar-post">
            {#if post.image}
              <div class="sidebar-post__img">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
            {/if}
            <div class="sidebar-post__body">
              <time class="post-date" datetime={post.date}>{fmtDate(post.date)}</time>
              <h3 class="sidebar-post__title">{post.title}</h3>
              {#if post.description}
                <p class="sidebar-post__desc">{truncate(post.description, 90)}</p>
              {/if}
            </div>
          </a>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Ad slot: mid-page -->
  <div class="ad-slot ad-slot--horiz" aria-label="Advertisement">
    <ins class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-5746515442496455"
      data-ad-slot="auto"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  </div>

</div><!-- /home-wrap dark -->

<!-- ─── POPULAR POSTS (light section) ─── -->
<section class="popular-section">
  <div class="popular-inner">
    <div class="section-header">
      <h2 class="section-title">POPULAR POSTS</h2>
      <a href="/all-posts" class="more-link">MORE →</a>
    </div>
    <div class="popular-grid">
      {#each popular as post}
        <a href="/{post.slug}/" class="popular-card">
          {#if post.image}
            <div class="popular-card__img">
              <img src={post.image} alt={post.title} loading="lazy" />
            </div>
          {/if}
          <div class="popular-card__body">
            <time class="post-date post-date--dark" datetime={post.date}>{fmtDate(post.date)}</time>
            <h3 class="popular-card__title">{post.title}</h3>
            {#if post.description}
              <p class="popular-card__desc">{truncate(post.description, 100)}</p>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- ─── MORE ARTICLES ─── -->
{#if remaining.length > 0}
  <section class="more-section">
    <div class="more-inner">
      <div class="section-header">
        <h2 class="section-title">ALL ARTICLES</h2>
      </div>
      <div class="more-grid">
        {#each remaining as post}
          <a href="/{post.slug}/" class="more-card">
            {#if post.image}
              <div class="more-card__img">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
            {/if}
            <div class="more-card__body">
              <time class="post-date" datetime={post.date}>{fmtDate(post.date)}</time>
              <h3 class="more-card__title">{post.title}</h3>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </section>
{/if}

<style>
  /* ─── Shared tokens (inherited from global) ─── */

  /* ─── Hero ─── */
  .hero-banner {
    background: var(--bg-dark);
    text-align: center;
    padding: 3.5rem 1rem 3rem;
    border-bottom: 2px solid var(--border-dark);
  }
  .hero-title {
    font-family: var(--font-body);
    font-weight: 800;
    font-size: clamp(4rem, 14vw, 11rem);
    letter-spacing: -0.02em;
    line-height: 0.9;
    color: var(--text-primary);
    text-transform: uppercase;
  }

  /* ─── Shared post date ─── */
  .post-date {
    font-family: var(--font-ui);
    font-size: 0.78rem;
    color: var(--text-muted);
    display: block;
    margin-bottom: 0.35rem;
    letter-spacing: 0.02em;
  }
  .post-date--dark { color: var(--text-mid); }

  /* ─── Home wrap (dark bg) ─── */
  .home-wrap {
    background: var(--bg-dark);
    padding: 0 1.5rem 2rem;
    max-width: var(--max-w);
    margin: 0 auto;
  }

  /* ─── Ad slots ─── */
  .ad-slot {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    margin: 1.5rem 0;
    background: rgba(255,255,255,0.03);
    border: 1px dashed #2a2a2c;
    border-radius: var(--radius-sm);
  }
  .ad-label {
    font-family: var(--font-ui);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    color: #444;
    text-transform: uppercase;
  }

  /* ─── Featured row ─── */
  .featured-row {
    display: grid;
    grid-template-columns: 55% 1fr;
    gap: 2rem;
    padding: 2rem 0 1rem;
  }

  /* Featured card */
  .featured-card {
    display: block;
    transition: opacity var(--transition);
  }
  .featured-card:hover { opacity: 0.88; }
  .featured-card__img-wrap {
    width: 100%;
    aspect-ratio: 16/10;
    overflow: hidden;
    border-radius: var(--radius-sm);
    background: var(--bg-card);
  }
  .featured-card__img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }
  .featured-card:hover .featured-card__img-wrap img { transform: scale(1.03); }
  .featured-card__body { padding: 1rem 0 0; }
  .featured-card__title {
    font-family: var(--font-body);
    font-weight: 800;
    font-size: clamp(1.35rem, 2.5vw, 2rem);
    line-height: 1.25;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  .featured-card__desc {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  /* Sidebar posts */
  .sidebar-posts {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .sidebar-post {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-dark);
    transition: opacity var(--transition);
  }
  .sidebar-post:first-child { padding-top: 0; }
  .sidebar-post:hover { opacity: 0.82; }
  .sidebar-post__img {
    width: 200px;
    aspect-ratio: 16/10;
    overflow: hidden;
    border-radius: var(--radius-sm);
    background: var(--bg-card);
    flex-shrink: 0;
  }
  .sidebar-post__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .sidebar-post__body { display: flex; flex-direction: column; justify-content: flex-start; }
  .sidebar-post__title {
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.3;
    color: var(--text-primary);
    margin-bottom: 0.35rem;
  }
  .sidebar-post__desc {
    font-size: 0.82rem;
    color: var(--text-muted);
    line-height: 1.5;
  }

  /* ─── Popular Posts section (light bg) ─── */
  .popular-section {
    background: var(--bg-light);
    padding: 3rem 1.5rem;
  }
  .popular-inner {
    max-width: var(--max-w);
    margin: 0 auto;
  }
  .section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid var(--border-light);
    padding-bottom: 0.75rem;
  }
  .section-title {
    font-family: var(--font-body);
    font-weight: 800;
    font-size: 1rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-dark);
  }
  .more-link {
    font-family: var(--font-ui);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--text-mid);
    text-transform: uppercase;
    transition: color var(--transition);
  }
  .more-link:hover { color: var(--orange); }

  .popular-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
  .popular-card {
    display: block;
    transition: transform var(--transition), opacity var(--transition);
  }
  .popular-card:hover { opacity: 0.85; transform: translateY(-2px); }
  .popular-card__img {
    width: 100%;
    aspect-ratio: 16/10;
    overflow: hidden;
    border-radius: var(--radius-sm);
    background: #ddd;
    margin-bottom: 0.75rem;
  }
  .popular-card__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  .popular-card:hover .popular-card__img img { transform: scale(1.04); }
  .popular-card__body {}
  .popular-card__title {
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.95rem;
    line-height: 1.35;
    color: var(--text-dark);
    margin-bottom: 0.4rem;
  }
  .popular-card__desc {
    font-size: 0.8rem;
    color: var(--text-mid);
    line-height: 1.5;
  }

  /* ─── More articles (dark bg) ─── */
  .more-section {
    background: var(--bg-dark);
    padding: 3rem 1.5rem;
  }
  .more-inner {
    max-width: var(--max-w);
    margin: 0 auto;
  }
  .more-section .section-header { border-bottom-color: var(--border-dark); }
  .more-section .section-title  { color: var(--text-primary); }

  .more-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }
  .more-card {
    display: block;
    background: var(--bg-mid);
    border-radius: var(--radius-md);
    overflow: hidden;
    transition: transform var(--transition), opacity var(--transition);
  }
  .more-card:hover { opacity: 0.85; transform: translateY(-2px); }
  .more-card__img {
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
    background: var(--bg-card);
  }
  .more-card__img img { width: 100%; height: 100%; object-fit: cover; }
  .more-card__body { padding: 0.85rem; }
  .more-card__title {
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 0.9rem;
    line-height: 1.35;
    color: var(--text-primary);
  }

  /* ─── Responsive ─── */
  @media (max-width: 900px) {
    .featured-row { grid-template-columns: 1fr; }
    .popular-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .hero-title { font-size: clamp(3rem, 18vw, 5rem); }
    .sidebar-post { grid-template-columns: 120px 1fr; }
    .sidebar-post__img { width: 120px; }
    .popular-grid { grid-template-columns: repeat(2, 1fr); }
  }
</style>
