<script>
	import ProduktCard from '$lib/components/home/ProduktCard.svelte';
	import { PackageOpen, LogIn } from 'lucide-svelte';

	let { data } = $props();
</script>

<header
	class="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm"
>
	<div class="flex items-center gap-2">
		<PackageOpen class="text-blue-600" size={28} />
		<h1 class="text-2xl font-bold text-gray-800">ADA Beach Bar Menu</h1>
	</div>

	{#if data.user?.role === 'admin'}
		<div class="flex flex-row gap-1">
			<a
				href="/admin/products"
				class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-1 text-white shadow hover:bg-blue-700"
			>
				<LogIn size={15} /> Admin
			</a>
			<div class="flex flex-col">
				<form action="/logout?/logout" method="POST">
					<button
						class="mt-1 w-fit cursor-pointer rounded-lg bg-red-500 px-3 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-red-600"
					>
						Logout
					</button>
				</form>
			</div>
		</div>
	{:else if !data.user}
		<a
			href="/login"
			class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
		>
			<LogIn size={18} /> Login
		</a>
	{:else if data.user}
		<div class="flex items-center gap-4">
			<div class="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 shadow-md">
				<p class="text-sm font-semibold text-white uppercase">
					{data.user.username.slice(0, 2)}
				</p>
			</div>

			<div class="flex flex-col">
				<form action="/logout?/logout" method="POST">
					<button
						class="mt-1 w-fit cursor-pointer rounded-lg bg-red-500 px-3 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-red-600"
					>
						Logout
					</button>
				</form>
			</div>
		</div>
	{/if}
</header>

<main class="px-6 py-8">
	<section>
		<h2 class="mb-6 text-xl font-semibold text-gray-900">Available Products</h2>

		{#if data.products.length > 0}
			<div class="grid grid-cols-4 gap-6">
				{#each data.products as produkt}
					<ProduktCard {produkt} isForAdmin={false} user={data.user} />
				{/each}
			</div>
		{:else}
			<p class="text-gray-500">No products available yet. Add some to get started.</p>
		{/if}
	</section>
</main>
