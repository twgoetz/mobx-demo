<script>
  import saveAs from "file-saver";
  import { authors, categories, books } from "./ContentState.js";

  const save = () => {
    const jsonState = {
      authors: $authors,
      categories: $categories,
      books: $books
    };
    const stateString = JSON.stringify(jsonState);
    console.log(stateString);
    const blob = new Blob([stateString], {
      type: "application/json"
    });
    saveAs(blob);
  };
</script>

<button class="io-button" on:click={save}>Save</button>
