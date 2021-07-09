<script>
  import {
    booksView,
    authorsView,
    categoriesView,
    selectedView
  } from "./UIState.js";

  const buttonLabels = {
    [booksView]: "Books",
    [authorsView]: "Authors",
    [categoriesView]: "Categories"
  };

  export let viewType;

  let selected;
  selectedView.subscribe(val => {
    selected = val;
  });

  const onClick = () => {
    selectedView.update(_ => viewType);
  };

  let selectedClass, className;
  $: selectedClass = viewType === selected ? " selected" : "";
  $: className = `nav-tabs-button${selectedClass}`;
</script>

<button class={className} on:click={onClick}>{buttonLabels[viewType]}</button>
