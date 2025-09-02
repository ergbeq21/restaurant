<script>
	import { SquarePen, Trash2 } from 'lucide-svelte';
	import EditProdukt from './EditProdukt.svelte';
	import DeleteProdukt from './DeleteProdukt.svelte';
	let { produkt, isForAdmin = true } = $props();

	let openEditProdukt = $state(false);
	let openDeleteProdukt = $state(false);
</script>

{#if openEditProdukt}
	<EditProdukt {produkt} bind:open={openEditProdukt} />
{/if}

{#if openDeleteProdukt}
	<DeleteProdukt {produkt} bind:open={openDeleteProdukt} />
{/if}

<div
	class="flex h-48 w-48 flex-shrink-0 flex-col gap-1 overflow-hidden rounded-lg border border-gray-200 bg-white"
>
	<img src={produkt.bild_url} alt={produkt.name} class="h-28 w-full object-cover" />

	<div class="flex--row flex items-center justify-between">
		<div class="flex flex-col gap-1 p-2">
			<h2 class="line-clamp-1 text-sm font-semibold text-gray-900">{produkt.name}</h2>
			<p class="text-xs font-semibold text-gray-800">{produkt.preis} €</p>
			<p class="line-clamp-1 text-xs text-gray-500">{produkt.category}</p>
		</div>

		{#if isForAdmin}
			<div class="mt-auto flex justify-end gap-1 px-2 pb-2">
				<button
					onclick={() => (openEditProdukt = true)}
					class="flex items-center justify-center rounded p-1 text-blue-600 transition hover:bg-blue-50"
					aria-label="Edit"
				>
					<SquarePen size={16} />
				</button>

				<button
					onclick={() => (openDeleteProdukt = true)}
					class="flex items-center justify-center rounded p-1 text-red-600 transition hover:bg-red-50"
					aria-label="Delete"
				>
					<Trash2 size={16} />
				</button>
			</div>
		{/if}
	</div>
</div>
