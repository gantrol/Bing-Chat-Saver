<script>

  export let url;
  export let text;
  export let type = "inner";

  const handleClassByType = (type) => {
    if (type === "bing") {
      return "btn-secondary";
    } else if (type === "inner") {
      return "btn-primary";
    } else {
      return "";
    }
  };
</script>

<button class="btn {handleClassByType(type)}" on:click={() => {
        chrome.tabs.create({
          url: url
        })
      }}>
  {text}
</button>
