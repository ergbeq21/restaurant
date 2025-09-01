<script lang="ts">
	import { enhance } from '$app/forms';

	let { produkt, open = $bindable() } = $props();

	let name = $state(produkt.name);
	let description = $state(produkt.beschreibung);
	let price = $state(produkt.preis);
</script>

<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30">
	<div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-200">
		<h2 class="mb-4 text-lg font-semibold">Produkt bearbeiten</h2>

		<form
			action="?/editProdukt"
			method="POST"
			use:enhance={() => {
				return async ({ update }) => {
					await update({ reset: false });
                    open = false;
				};
			}}
		>
			<div class="space-y-3">
                <input type="hidden" value={produkt.id} name="id" />
				<input type="text" bind:value={name} name="name" class="w-full rounded-lg border p-2" />

				<input
					type="text"
					bind:value={description}
					name="description"
					class="w-full rounded-lg border p-2"
				/>

				<input type="number" bind:value={price} name="price" class="w-full rounded-lg border p-2" />
			</div>

			<div class="mt-6 flex justify-end gap-2">
				<button
					type="reset"
					onclick={() => (open = false)}
					class="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
				>
					Abbrechen
				</button>
				<button class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
					Speichern
				</button>
			</div>
		</form>
	</div>
</div>
