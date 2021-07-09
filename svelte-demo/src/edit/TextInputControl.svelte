<script>
  export let label = '';
  export let value = '';
</script>

<div class="text-input-control">
  <div class="text-input-label">{label}</div>
  <input type="text" name={label} bind:value={value} />
</div>