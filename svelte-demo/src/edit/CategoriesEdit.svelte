<script>
  import TextInputControl from './TextInputControl.svelte';
  import { newCategory } from '../ContentState.js';

  export let name = '';
  export let id = '';

  const addNew = () => {
      newCategory(name);
      name = '';
  }
</script>

<div>
  <h4>Edit category</h4>
  <TextInputControl label="Name" bind:value={name} />
  <div class="edit-button" on:click={addNew} >Submit</div>
</div>
