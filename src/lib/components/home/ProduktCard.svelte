<script>
	let { produkt } = $props();

</script>

<div
	class="flex h-48 w-full flex-shrink-0 flex-col gap-1 overflow-hidden rounded-lg border border-gray-200 bg-white"
>
	<img src={produkt.bild_url} alt={produkt.name} class="h-28 w-full object-cover" />

	<div class="flex--row flex items-center justify-between">
		<div class="flex flex-col gap-1 p-2">
			<h2 class="line-clamp-1 text-sm font-semibold text-gray-900">{produkt.name}</h2>
			<p class="text-xs font-semibold text-gray-800">{produkt.preis} €</p>
			<p class="line-clamp-1 text-xs text-gray-500">{produkt.category}</p>
		</div>

	</div>
</div>
