<script lang="ts">
   import { onMount } from "svelte";

   import { homeStoreService } from "$lib/domain/home";
   import { userStoreService } from "$lib/domain/user";
   import { stringify } from "$lib/domain/shared";

   let data$ = homeStoreService.data$.pipe(stringify(3));
   let loading$ = homeStoreService.loading$;
   let error$ = homeStoreService.error$;

   onMount(() => {
      userStoreService.queryProfile();
      homeStoreService.queryNewData();
   });

   function handleResetButtonClick(): void {
      homeStoreService.reset();
   }

   function handleSnapshotButtonClick(): void {
      alert(homeStoreService.snapshotToString());
   }
</script>

<pre>
  <code>data: {$data$}</code>
  <code>loading: {$loading$}</code>
  <code>error: {$error$}</code>
</pre>

<button id="reset" on:click={handleResetButtonClick}>Reset</button>
<button id="snapshot" on:click={handleSnapshotButtonClick}>Snapshot</button>

<style>
   pre {
      border: 1px solid #cecece;
      text-align: left;
      padding: 0.75rem;
      border-radius: 5px;
      width: 20rem;
   }
</style>
