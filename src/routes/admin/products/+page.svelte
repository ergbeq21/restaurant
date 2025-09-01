<script lang="ts">
	import CreateNewCategory from '$lib/components/categories/CreateNewCategory.svelte';
	import CreateNewProdukt from '$lib/components/products/CreateNewProdukt.svelte';
	import Produkt from '$lib/components/products/Produkt.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Plus, ChevronLeft, Tags } from 'lucide-svelte';
	import SearchProdukts from '$lib/components/products/SearchProdukts.svelte';

	let { data } = $props();
	let createNewProdukt = $state(false);
	let createNewCategory = $state(false);

	//categories filter
	function setQueryParameter(categoryName) {
		const params = new URLSearchParams(page.url.search);
		params.set('category', categoryName);

		goto(`?${params.toString()}`, { replaceState: true });
	}

	function createCategoryFilter() {
		const params = new URLSearchParams(page.url.search);
		params.delete('category');

		goto(`?${params.toString()}`, { replaceState: true });
	}
</script>

{#if createNewProdukt}
	<CreateNewProdukt bind:open={createNewProdukt} categories={data.categories} />
{/if}

{#if createNewCategory}
	<CreateNewCategory bind:open={createNewCategory} />
{/if}

<div class="flex">
	<aside
		class="sticky top-20 flex h-screen w-80 flex-col justify-between border-r border-gray-200 bg-stone-500 p-5"
	>
		<div class="flex flex-col gap-3">
			<a
				href="/"
				class="flex w-full flex-row items-center justify-between rounded bg-gray-100 px-4 py-2 text-center font-medium text-gray-700 hover:bg-gray-200"
			>
				<ChevronLeft size={18} />
				<span class="mr-17">Go back</span>
			</a>

			<div class="mt-4 flex flex-col gap-2">
				<div class="flex flex-col gap-2">
					<label for="category" class="block text-sm font-medium text-white">All Kategories</label>
					<button
						class="w-full cursor-pointer bg-white/20 p-2 text-white hover:bg-white/40"
						onclick={createCategoryFilter}>All Categories</button
					>
				</div>

				<div class="flex flex-col gap-2">
					<label for="category" class="block text-sm font-medium text-white">Kategorien</label>
					{#each data.categories as category}
						<button
							class="flex w-full cursor-pointer justify-between bg-white/20 p-2 text-white hover:bg-white/40"
							onclick={() => setQueryParameter(category.name)}
						>
							{category.name}
							<span>10</span>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<div class="w-full">
			<button
				class="flex w-full cursor-pointer items-center justify-center border border-white bg-white/30 p-2 text-white"
				onclick={() => (createNewCategory = true)}>Create new category</button
			>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="w-full p-6">
		<header class="w-full">
			<h1 class="flex flex-row items-center justify-start gap-2 text-2xl font-bold">
				<Tags />
				<span>Produkte</span>
			</h1>
			<p class="text-gray-500">Verwalte deine Produkte hier.</p>
		</header>

		<!--actions-->
		<section class="mt-5 mb-4 flex w-full items-center justify-between">
			<!--search-->
			<SearchProdukts />

			<button
				disabled={data.categories.length == 0}
				class={`${data.categories.length == 0 ? 'cursor-not-allowed bg-blue-200' : 'bg-blue-600 transition hover:bg-blue-700'} flex items-center gap-2 rounded-lg  px-4 py-2 font-medium text-white `}
				onclick={() => (createNewProdukt = true)}
			>
				<Plus size={18} aria-label="Neues Produkt hinzufügen" /> Neues Produkt
			</button>
		</section>

		<!--die produkte-->
		{#if data.products.length > 0 && data.categories.length > 0}
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each data.products as product}
					<Produkt produkt={product} />
				{/each}
			</div>
		{:else if data.categories.length == 0}
			<div class="mt-50 flex flex-col items-center justify-center gap-4 text-center">
				<p class="text-gray-500">Noch keine Kategorien vorhanden. Erstelle die erste Kategorie!</p>
				<button
					class="flex items-center gap-2 rounded-lg border border-gray-400 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-50"
					onclick={() => (createNewCategory = true)}
				>
					<Plus size={18} /> Neue Kategorie
				</button>
			</div>
		{:else}
			<div class="mt-50 flex flex-col items-center justify-center gap-4 text-center">
				<p class="text-gray-500">Noch keine Produkte vorhanden. Erstelle das erste Produkt!</p>
				<button
					class="flex items-center gap-2 rounded-lg border border-gray-400 px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-50"
					onclick={() => (createNewProdukt = true)}
				>
					<Plus size={18} /> Neues Produkt
				</button>
			</div>
		{/if}
	</main>
</div>
