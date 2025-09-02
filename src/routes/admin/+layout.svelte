<script>
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Plus, ChevronLeft, Tags, Box, ShoppingCart, Settings, User } from 'lucide-svelte';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex h-screen">
	<aside
		class="fixed top-0 left-0 z-50 flex h-screen w-70 flex-col justify-between border-r border-gray-200 bg-stone-500 p-5"
	>
		<div class="flex flex-col gap-3">
			<a
				href="/"
				class="flex w-full flex-row items-center justify-between rounded bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
			>
				<ChevronLeft size={18} />
				<span class="mr-17">Go back</span>
			</a>

			<div class="mt-6 flex flex-col gap-2">
				<!-- Navigation Items -->
				<a
					href="/admin/products"
					class="flex items-center gap-3 rounded-lg bg-white/20 px-4 py-2 font-medium text-white transition hover:bg-white/40"
				>
					<Box size={18} /> <span>Produkte</span>
				</a>

				<a
					href="/admin/orders"
					class="flex items-center gap-3 rounded-lg bg-white/20 px-4 py-2 font-medium text-white transition hover:bg-white/40"
				>
					<ShoppingCart size={18} /> <span>Bestellungen</span>
				</a>

				<a
					href="/admin/settings"
					class="flex items-center gap-3 rounded-lg bg-white/20 px-4 py-2 font-medium text-white transition hover:bg-white/40"
				>
					<Settings size={18} /> <span>Einstellungen</span>
				</a>
			</div>
		</div>

		<div class="flex w-full items-center gap-4">
			<div
				class="flex h-14 w-14 items-center justify-center rounded-full bg-stone-700 text-lg font-bold text-white"
			>
				{data.user.username?.charAt(0).toUpperCase()}
			</div>

			<!-- User Info -->
			<div class="flex flex-col">
				<h1 class="text-lg font-semibold text-white">{data.user.username}</h1>
				<p class="text-sm text-white">{data.user.email}</p>
			</div>
		</div>
	</aside>

	{@render children?.()}
</div>
