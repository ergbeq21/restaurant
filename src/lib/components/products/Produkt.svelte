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

<div class="flex flex-col gap-1 border border-gray-200 bg-white">
	<img src={produkt.bild_url} alt={produkt.name} class="h-40 w-full object-cover" />

	<div class="flex flex-row items-end justify-between">
		<div class="flex flex-col gap-1 p-2">
			<h2 class="line-clamp-1 text-lg font-semibold text-gray-900">{produkt.name}</h2>
			<p class="mt-1 text-base font-semibold text-gray-800">{produkt.preis} €</p>
			<p>{produkt.category}</p>
		</div>

		{#if isForAdmin}
			<div class="mt-2 flex gap-2">
				<button
					onclick={() => (openEditProdukt = true)}
					class="flex items-center justify-center rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
					aria-label="Edit"
				>
					<SquarePen size={20} />
				</button>

				<button
					onclick={() => (openDeleteProdukt = true)}
					class="flex items-center justify-center rounded-lg p-2 text-red-600 transition hover:bg-red-50"
					aria-label="Delete"
				>
					<Trash2 size={20} />
				</button>
			</div>
		{/if}
	</div>
</div>
