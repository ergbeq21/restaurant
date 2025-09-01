<script>
    import { SquarePen, Trash2 } from 'lucide-svelte';
    import EditProdukt from "./EditProdukt.svelte";
    import DeleteProdukt from "./DeleteProdukt.svelte";
	let { produkt, isForAdmin=true } = $props();

	let openEditProdukt = $state(false);
    let openDeleteProdukt = $state(false);
</script>

{#if openEditProdukt}
		<EditProdukt {produkt} bind:open={openEditProdukt} />
{/if}

{#if openDeleteProdukt}
	<DeleteProdukt {produkt} bind:open={openDeleteProdukt} />
{/if}


<div class="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
	<h2 class="text-lg font-semibold text-gray-900">{produkt.name}</h2>
	<p class="text-sm text-gray-600">{produkt.beschreibung}</p>
	<p class="text-sm font-medium text-gray-800">{produkt.preis}</p>

    {#if isForAdmin}
	<div class="mt-3 flex gap-2">
		<button
			onclick={() => (openEditProdukt = true)}
			class="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-medium text-blue-600 shadow "
		>
			<SquarePen size={20} />
		</button>

		<button
			onclick={() => (openDeleteProdukt = true)}
			class="flex  cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-medium text-red-600 shadow "
		>
			<Trash2 size={20} />
		</button>
	</div>
    {/if}
</div>