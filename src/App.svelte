<script>
  import { onMount } from 'svelte';

  export let today = '';
  export let menuOpen = false;
  export let fetchError = false;
  /**
     * @type {any[]}
     */
  let articles = []

  onMount(() => {
    today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
    fetchArticles();
  });

  export function toggleMenu() {
    menuOpen = !menuOpen;
  }

  async function fetchArticles() {
    try {
      const res = await fetch('/api/key'); 
      const { apiKey } = await res.json();

      const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=timesTag.location%3Asacramento&api-key=${apiKey}`);
      const data = await response.json();
      
      articles = data.response.docs.slice(0, 9);
      
    } catch (error) {
      fetchError = true;
      console.error('Failed to fetch articles:', error);
    }
  }
</script>

<header>
  <div class="header-top">
    <h1>The New York Times</h1>
    <button class="hamburger" on:click={toggleMenu}>☰</button>
  </div>
  <p class="date time">{today}</p>
</header>

<p class="date2 time {menuOpen ? 'open' : ''}">{today}</p>

<nav class="topnav {menuOpen ? 'open' : ''}">
  <ul>
    <li>U.S.</li>
    <li>World</li>
    <li>Business</li>
    <li>Arts</li>
    <li>Lifestyle</li>
    <li>Opinion</li>
    <li class="divider"></li>
    <li>Audio</li>
    <li>Games</li>
    <li>Cooking</li>
    <li>Wirecutter</li>
    <li>The Athletic</li>
  </ul>
</nav>

{#if fetchError}
  <p>Failed to load news. Please try again later.</p>
{:else if articles.length === 0}
  <p>Loading latest news...</p>
{:else}
<main class="container">
  {#each articles as article, i}
    <section class="column {i % 3 === 1 ? 'midColumn' : 'sideColumn'}">
      <section class="columnSection">
        {#if article.multimedia && article.multimedia.length}
          <img src={"https://www.nytimes.com/" + article.multimedia[0].url} alt={article.multimedia[0].caption || 'Article Image'} />
        {/if}
        <h2>{article.headline.main}</h2> <!-- Corrected headline -->
        <p>{article.abstract}</p>
      </section>
      <div class="columnDivider"></div>
    </section>
  {/each}
</main>
{/if}



<footer>
  &copy;2025 ECS 162 HW1. &copy;Jaden Yang. All rights reserved.
</footer>


<style>
  @import './app.css';
</style>
