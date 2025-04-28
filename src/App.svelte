<script>
  import { onMount } from 'svelte';

  let today = '';
  let menuOpen = false;

  onMount(() => {
    today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
  });

  function toggleMenu() {
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


<main class="container">
  <section class="column sideColumn">
    <section class="columnSection">
      <img src="placeholder.png" alt="SideImage" />
      <h2>Side Column Left 1</h2>
      <p>This is the information to be shown.</p>
    </section>
    <div class="columnDivider"></div>
    <section class="columnSection">
      <h2>Side Column Left 2</h2>
      <p>This is the information to be shown.</p>
    </section>
  </section>

  <section class="column midColumn">
    <section class="columnSection">
      <h2>Column Middle 1</h2>
      <p>This is the information to be shown.</p>
    </section>
    <div class="columnDivider"></div>
    <section class="columnSection">
      <img src="placeholder.png" alt="MiddleImage" />
      <h2>Column Middle 2</h2>
      <p>This is the information to be shown.</p>
    </section>
  </section>

  <section class="column sideColumn">
    <section class="columnSection">
      <img src="placeholder.png" alt="SideImage" />
      <h2>Side Column Right 1</h2>
      <p>This is the information to be shown.</p>
    </section>
    <div class="columnDivider"></div>
    <section class="columnSection">
      <h2>Side Column Right 2</h2>
      <p>This is the information to be shown.</p>
    </section>  
  </section>
</main>

<footer>
  &copy;2025 ECS 162 HW1. &copy;Jaden Yang. All rights reserved.
</footer>

<style>
  @import './app.css';
</style>
