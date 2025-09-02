<script lang="ts">
	import { enhance } from '$app/forms';

	let { categorie, open = $bindable() } = $props();
	let loading = $state(false);
</script>

<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30">
	<div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-200">
		<h2 class="mb-4 text-lg font-semibold">Are you sure you want to delete {categorie.name}?</h2>

		<form
			action="?/deleteCategorie"
			method="POST"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update({ reset: false });
					open = false;
					loading = false;
				};
			}}
		>
			<div class="space-y-3">
				<input type="hidden" value={categorie.id} name="categorieId" />
			</div>

			<div class="mt-6 flex justify-end gap-2">
				<button
					type="reset"
					onclick={() => (open = false)}
					class="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
				>
					Abbrechen
				</button>
				<button
					disabled={loading}
					class={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-white transition 
                        ${!loading ? 'bg-red-600 hover:bg-red-700' : 'cursor-not-allowed bg-red-300'}`}
				>
					{#if loading}
						<div
							class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
						></div>
					{/if}
					<span>Delete</span>
				</button>
			</div>
		</form>
	</div>
</div>
