<script>
  import { booksView, authorsView, categoriesView } from "./UIState.js";
  import NavButton from "./NavButton.svelte";
</script>

<div class="nav-tabs">
  <NavButton viewType={booksView} />
  <NavButton viewType={authorsView} />
  <NavButton viewType={categoriesView} />
</div>
