<script>
  import { authors } from '../ContentState.js';
</script>

<div class="nav-items">
  <ul>
    {#each $authors as { firstName, lastName }}
      <li><b>{`${firstName} ${lastName}`}</b></li>
    {/each}
  </ul>
</div>
