<script>
  import { categories } from '../ContentState.js';
</script>

<div class="nav-items">
  <ul>
    {#each $categories as { name }}
      <li><b>{name}</b></li>
    {/each}
  </ul>
</div>
