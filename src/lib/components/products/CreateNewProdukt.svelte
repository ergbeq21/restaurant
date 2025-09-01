
<script lang="ts">
	import { enhance } from '$app/forms';


	let { open = $bindable() } = $props();

</script>

<div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/30">
	<div class="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-200">
		<h2 class="mb-4 text-lg font-semibold">Create New Produkt</h2>

		<form
			action="?/createProdukt"
			method="POST"
            enctype="multipart/form-data"
			use:enhance={() => {
				return async ({ update }) => {
					await update({ reset: false });
                    open = false;
				};
			}}
		>
			<div class="space-y-3">
				<input type="text" name="name" class="w-full rounded-lg border p-2" placeholder="Produkt name"/>

				<input
					type="text"
					name="description"
					class="w-full rounded-lg border p-2"
					placeholder="Produkt beschreibung"
				/>

				<input type="number" name="price" class="w-full rounded-lg border p-2" placeholder="Produkt preis"/>

		        <input type="file" name="image" class="w-full rounded-lg border border-gray-300 p-2" />
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
