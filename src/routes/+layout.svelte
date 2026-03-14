<script>
  export let data;

  const DEFAULT_TITLE = 'BilliardBeast — Pool Tables, Cues & Billiards Guides';
  const DEFAULT_DESCRIPTION = 'Activate Beast-Mode on Everything Billiards';
  const DEFAULT_IMAGE = 'https://billiardbeast.com/images/billiard-beast-logo-2.webp';
  const SITE_NAME = 'BilliardBeast';
  const SITE_URL = 'https://billiardbeast.com';

  $: title       = data.title       || DEFAULT_TITLE;
  $: description = data.description || DEFAULT_DESCRIPTION;
  $: image       = data.image       || DEFAULT_IMAGE;
  $: canonicalUrl = data.url ? `${SITE_URL}${data.url.pathname}` : SITE_URL;
  $: isArticle   = data.url ? (data.url.pathname !== '/') : false;
  $: schema      = data.schema;

  let menuOpen = false;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Raleway:ital,wght@0,700;0,900;1,700;1,900&family=Nunito+Sans:wght@400;600;700&display=swap"
    rel="stylesheet"
  />

  <!-- Open Graph -->
  <meta property="og:title"       content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url"         content={canonicalUrl} />
  <meta property="og:site_name"   content={SITE_NAME} />
  <meta property="og:image"       content={image} />
  <meta property="og:type"        content={isArticle ? 'article' : 'website'} />

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image"       content={image} />

  <!-- JSON-LD -->
  {#if schema}
    {@html `<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`}
  {/if}
</svelte:head>

<!-- ─── HEADER ─── -->
<header>
  <div class="header-inner">
    <!-- Social icons -->
    <nav class="social-nav" aria-label="Social media links">
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4 4l16 16M4 20L20 4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
      </a>
      <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
      </a>
    </nav>

    <!-- Logo -->
    <a href="/" class="logo-link">
      <img
        src="/images/billiard-beast-logo-glass.svg"
        alt="BilliardBeast"
        width="180"
        height="64"
        class="logo"
      />
    </a>

    <!-- Hamburger -->
    <button
      class="hamburger"
      aria-label="Open menu"
      aria-expanded={menuOpen}
      on:click={() => (menuOpen = !menuOpen)}
    >
      <span></span><span></span><span></span>
    </button>
  </div>

  <!-- Mobile nav -->
  {#if menuOpen}
    <nav class="mobile-nav" aria-label="Main navigation">
      <a href="/" on:click={() => (menuOpen = false)}>Home</a>
      <a href="/pool-table-reviews" on:click={() => (menuOpen = false)}>Pool Tables</a>
      <a href="/pool-cue-reviews" on:click={() => (menuOpen = false)}>Cues</a>
      <a href="/pool-rules" on:click={() => (menuOpen = false)}>Rules</a>
    </nav>
  {/if}
</header>

<!-- ─── PAGE CONTENT ─── -->
<slot />

<!-- ─── FOOTER ─── -->
<footer>
  <div class="footer-inner">
    <a href="/" class="footer-logo">
      <img src="/images/billiard-beast-logo-glass.svg" alt="BilliardBeast" width="160" height="57" />
    </a>
    <p class="footer-tagline">Activate Beast-Mode on Everything Billiards</p>
    <nav class="footer-links" aria-label="Footer navigation">
      <a href="/about">About</a>
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/affiliate-disclosure">Affiliate Disclosure</a>
    </nav>
    <p class="footer-copy">&copy; {new Date().getFullYear()} BilliardBeast. All rights reserved.</p>
  </div>
</footer>

<style>
  /* ── Global resets & tokens ── */
  :global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }

  :global(:root) {
    --bg-dark:    #141618;
    --bg-mid:     #1e2022;
    --bg-card:    #303133;
    --bg-light:   #fafafa;
    --bg-header:  #eeeeee;
    --orange:     #f26522;
    --orange-dim: #c94f15;
    --text-primary: #dee2e6;
    --text-muted:   #9a9a9a;
    --text-dark:    #2f2f2f;
    --text-mid:     #6e6e6e;
    --border-dark:  #2a2a2c;
    --border-light: #dddddd;
    --font-body:    'Manrope', ui-sans-serif, sans-serif;
    --font-accent:  'Raleway', ui-sans-serif, sans-serif;
    --font-ui:      'Nunito Sans', ui-sans-serif, sans-serif;
    --radius-sm:  4px;
    --radius-md:  8px;
    --radius-pill: 999px;
    --max-w: 1140px;
    --transition: 0.18s ease;
  }

  :global(body) {
    font-family: var(--font-body);
    background: var(--bg-dark);
    color: var(--text-primary);
    font-size: 16px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  :global(a) { color: inherit; text-decoration: none; }
  :global(img) { display: block; max-width: 100%; height: auto; }

  /* ── Header ── */
  header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: #141618;
    border-bottom: 1px solid var(--border-dark);
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }

  .header-inner {
    max-width: var(--max-w);
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 68px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
  }

  /* Social icons */
  .social-nav {
    display: flex;
    gap: 0.85rem;
    align-items: center;
  }
  .social-nav a {
    color: #9a9a9a;
    display: flex;
    align-items: center;
    transition: color var(--transition);
  }
  .social-nav a:hover { color: var(--orange); }

  /* Logo */
  .logo-link {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo {
    height: 54px;
    width: auto;
  }

  /* Hamburger */
  .hamburger {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 4px;
    justify-self: end;
  }
  .hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: #9a9a9a;
    border-radius: 2px;
    transition: background var(--transition);
  }
  .hamburger:hover span { background: var(--orange); }

  /* Mobile nav */
  .mobile-nav {
    background: #141618;
    border-top: 1px solid var(--border-dark);
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .mobile-nav a {
    font-family: var(--font-ui);
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: color var(--transition);
  }
  .mobile-nav a:hover { color: var(--orange); }

  /* ── Footer ── */
  footer {
    background: #0d0e10;
    border-top: 1px solid var(--border-dark);
    padding: 2.5rem 1.5rem;
    text-align: center;
  }
  .footer-inner {
    max-width: var(--max-w);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .footer-logo img { margin: 0 auto; opacity: 0.85; }
  .footer-tagline {
    font-size: 0.875rem;
    color: var(--text-muted);
    font-style: italic;
  }
  .footer-links {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .footer-links a {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: color var(--transition);
  }
  .footer-links a:hover { color: var(--orange); }
  .footer-copy {
    font-size: 0.75rem;
    color: #555;
  }
</style>
