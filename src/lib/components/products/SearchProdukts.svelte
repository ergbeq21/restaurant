<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Search, X } from 'lucide-svelte';
	import { debounce } from 'throttle-debounce';

	let searchTerm = $state(page.url.searchParams.get(`search`) || '');

	const searchName = () => {
		let url = new URL(page.url);
		if (searchTerm.trim() !== '') {
			url.searchParams.set('search', searchTerm);
		} else {
			url.searchParams.delete('search');
		}
		goto(url.toString(), { replaceState: true, keepFocus: true });
	};

	function handleClearInput() {
		searchTerm = '';
		let url = new URL(page.url);
		url.searchParams.delete(`search`);
		goto(url.toString(), { replaceState: true, keepFocus: true });
	}

	const debounceSearch = debounce(300, searchName);
</script>

<div class="relative flex items-center text-sm">
	<Search size={14} stroke-width={2} class="pointer-events-none absolute left-2 text-zinc-500" />
	<input
		type="text"
		bind:value={searchTerm}
		oninput={(e) => debounceSearch()}
		placeholder="Search products..."
		class="h-9 w-70 rounded border border-gray-400 py-1 pr-8 pl-7 text-sm"
	/>

	{#if searchTerm}
		<button
			class="absolute right-1 flex h-5 w-5 items-center justify-center text-zinc-500"
			aria-label="Clear input"
			onclick={handleClearInput}
		>
			<X size={12} stroke-width={2} aria-hidden="true" />
		</button>
	{/if}
</div>
