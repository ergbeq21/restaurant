<script lang="ts">
	import CreateNewProdukt from '$lib/components/products/CreateNewProdukt.svelte';
	import Produkt from '$lib/components/products/Produkt.svelte';
	import { Plus } from "lucide-svelte"; // icon

	let { data } = $props();
    let createNewProdukt = $state(false);
</script>

{#if createNewProdukt}
    <CreateNewProdukt bind:open={createNewProdukt} />
{/if}

<header class="flex flex-row items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
    <h1 class="text-2xl font-bold text-gray-800">Produktverwaltung</h1>
    <button 
        class="flex items-center gap-2 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
        onclick={() => (createNewProdukt = true)}
    >
        <Plus size={18} /> Neues Produkt
    </button>
</header>

<main class="p-4">
    {#if data.products.length > 0}
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {#each data.products as product}
                <Produkt produkt={product} />
            {/each}
        </div>
    {:else}
    <div class="flex justify-center items-center mt-50 flex-col gap-4">
        <p class="text-gray-500 text-center mt-8">Noch keine Produkte vorhanden. Erstelle das erste Produkt!</p>
        <button 
            class="flex items-center gap-2 rounded-lg  px-4 py-2 text-gray-500 cursor-pointer font-medium border border-gray-500 transition"
            onclick={() => (createNewProdukt = true)}
        >
            <Plus size={18} /> Neues Produkt
        </button>
    </div>
    {/if}
</main>
