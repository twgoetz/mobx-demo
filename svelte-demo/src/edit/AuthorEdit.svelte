<script>
  import TextInputControl from './TextInputControl.svelte';
  import { newAuthor } from '../ContentState.js';

  export let firstName = '';
  export let lastName = '';
  export let id = '';

  const addNew = () => {
      console.log(`${firstName} ${lastName}`)
      newAuthor(firstName, lastName);
      firstName = '';
      lastName = '';
  }
</script>

<div>
  <h4>Edit author</h4>
  <TextInputControl label="First name" bind:value={firstName} />
  <TextInputControl label="Last name" bind:value={lastName} />
  <div class="edit-button" on:click={addNew} >Submit</div>
</div>
