<script>
  import { books } from '../ContentState.js';
</script>

<div class="nav-items">
  <ul>
    {#each $books as { title }}
      <li><b>{`${title}`}</b></li>
    {/each}
  </ul>
</div>
