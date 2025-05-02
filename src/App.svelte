<script>
  import { onMount } from 'svelte';
  import { fetchArticles } from './lib/api.js';
  
  export let today = '';
  export let menuOpen = false;

  /**
     * @type {string | any[]}
     */
  let articles = [];
  let fetchError = false;

  onMount(async () => {
    today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
    const result = await fetchArticles();
    articles = result.articles;
    fetchError = result.fetchError;
  });

  export function toggleMenu() {
    menuOpen = !menuOpen;
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
      <a 
      href={article.web_url} 
      target="_blank" 
      rel="noopener noreferrer" 
      class="column-link"
    >
      <section class="columnSection">
        {#if article.multimedia}
          <img src={article.multimedia.default.url} alt={article.multimedia.caption || 'Article Image'} />
        {/if}
        <h2>{article.headline.main}</h2> 
        <p>{article.abstract}</p>
      </section>
      <div class="columnDivider"></div>
    </a>
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
