<script>
  import { fly } from "svelte/transition";
  import LoadButton from "./LoadButton.svelte";
  import SaveButton from "./SaveButton.svelte";
  import NavTabs from "./NavTabs.svelte";
  import AuthorEdit from "./edit/AuthorEdit.svelte";
  import CategoriesEdit from "./edit/CategoriesEdit.svelte";
  import BookEdit from "./edit/BookEdit.svelte";
  import AuthorsList from "./list/AuthorsList.svelte";
  import CategoriesList from "./list/CategoriesList.svelte";
  import BooksList from "./list/BooksList.svelte";
  import {
    booksView,
    authorsView,
    categoriesView,
    selectedView
  } from "./UIState.js";
</script>

<style>

</style>

<main>
  <div class="main-view">
    <div class="nav-bar">
      <NavTabs />
      {#if $selectedView === booksView}
        <div in:fly="{{x: 200, duration: 2000 }}" out:fly="{{x: -200, duration: 2000 }}">
          <BooksList />
        </div>
      {:else if $selectedView === categoriesView}
        <div in:fly="{{x: 200, duration: 2000 }}" out:fly="{{x: -200, duration: 2000 }}">
          <CategoriesList />
        </div>
      {:else}
        <div in:fly="{{x: 200, duration: 2000 }}" out:fly="{{x: -200, duration: 2000 }}">
          <AuthorsList />
        </div>
      {/if}
    </div>
    <div class="content-view">
      <div class="content-display" />
      <div class="content-edit">
        {#if $selectedView === booksView}
          <BookEdit />
        {:else if $selectedView === categoriesView}
          <CategoriesEdit />
        {:else}
          <AuthorEdit />
        {/if}
      </div>
    </div>
  </div>
  <div class="io-buttons">
    <LoadButton />
    <SaveButton />
  </div>
</main>
