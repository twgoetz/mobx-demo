<script>
  import TextInputControl from './TextInputControl.svelte';
  import { newBook, authors, categories } from '../ContentState.js';

  export let title = '';
  export let year = '';
  export let id = '';
  export let authorId = '';
  export let categoryId = '';

  const addNew = () => {
      newBook(authorId, title, year, categoryId);
      title = '';
      year = '';
      authorId = '';
      categoryId = '';
  }
</script>

<div>
  <h4>Edit book</h4>
  <select bind:value={authorId}>
    <option value=''>Unknown author</option>
    {#each $authors as { firstName, lastName, id }}
      <option value={id}>{`${firstName} ${lastName}`}</option>
    {/each}
  </select>
  <TextInputControl label="Title" bind:value={title} />
  <TextInputControl label="Year published" bind:value={year} />
  <select bind:value={categoryId}>
    <option value="">Not categorized</option>
    {#each $categories as { name, id }}
      <option value={id}>{name}</option>
    {/each}
  </select>
  <div class="edit-button" on:click={addNew} >Submit</div>
</div>
