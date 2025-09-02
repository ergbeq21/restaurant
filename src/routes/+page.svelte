<script>
	import Produkt from '$lib/components/products/Produkt.svelte';
	import { PackageOpen, LogIn } from 'lucide-svelte';

	let { data } = $props();
</script>

<header
	class="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm"
>
	<div class="flex items-center gap-2">
		<PackageOpen class="text-blue-600" size={28} />
		<h1 class="text-2xl font-bold text-gray-800">Unsere Produkts</h1>
	</div>
	<a
		href="/admin/products"
		class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
	>
		<LogIn size={18} /> Login
	</a>
</header>

<main class="px-6 py-8">
	<section>
		<h2 class="mb-6 text-xl font-semibold text-gray-900">Available Products</h2>

		{#if data.products.length > 0}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.products as produkt}
					<Produkt {produkt} isForAdmin={false} />
				{/each}
			</div>
		{:else}
			<p class="text-gray-500">No products available yet. Add some to get started.</p>
		{/if}
	</section>
</main>
