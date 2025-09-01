<script lang="ts">
	import { enhance } from '$app/forms';

	let { open = $bindable(), categories } = $props();

	let name = $state('');
	let description = $state('');
	let price = $state(null);
	let image = $state(null);
	let category = $state('');

	let isValid = $state(false);

	$effect(() => {
		isValid = name !== '' && price !== null && image !== null && category !== '';
	});

	let loading = $state(false);
</script>

<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
	<div class="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-200">
		<h2 class="mb-4 text-lg font-semibold">Create New Produkt</h2>

		<form
			action="?/createProdukt"
			method="POST"
			enctype="multipart/form-data"
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
				<label for="name">Produkt Name</label>
				<input
					type="text"
					name="name"
					class="w-full rounded-lg border p-2"
					placeholder="Produkt name"
					required
					bind:value={name}
				/>

				<label for="description"
					>Produkt Beschreibung <span class="text-gray-500">(optional)</span></label
				>
				<input
					type="text"
					name="description"
					class="w-full rounded-lg border p-2"
					placeholder="Produkt beschreibung"
					bind:value={description}
				/>

				<label for="price">Produkt Preis</label>
				<input
					type="number"
					name="price"
					class="w-full rounded-lg border p-2"
					placeholder="Produkt preis"
					required
					bind:value={price}
				/>

				<label for="category">Produkt Kategorie</label>
				<select name="category" class="w-full rounded-lg border p-2" required bind:value={category}>
					<option value="" disabled selected>Wähle eine Kategorie</option>
					{#each categories as category}
						<option value={category.id}>{category.name}</option>
					{/each}
				</select>

				<label for="image">Produkt Bild</label>
				<input
					type="file"
					name="image"
					class="w-full rounded-lg border bg-white p-2 text-gray-500"
					required
					bind:value={image}
				/>
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
					disabled={!isValid || loading}
					class={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-white transition 
                        ${isValid && !loading ? 'bg-red-600 hover:bg-red-700' : 'cursor-not-allowed bg-red-300'}`}
				>
					{#if loading}
						<div
							class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
						></div>
					{/if}
					<span>Speichern</span>
				</button>
			</div>
		</form>
	</div>
</div>
