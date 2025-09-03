<script>
	let { produkt,user } = $props();
</script>

<div
	class="flex h-58 w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition hover:shadow-lg"
>
	<!-- Image -->
	<img
		src={produkt.bild_url}
		alt={produkt.name}
		class="h-32 w-full object-cover"
	/>

	<!-- Content -->
	 <div class="flex flex-row items-end justify-between">
	<div class="flex flex-col gap-1 p-3">
		<h2 class="line-clamp-1 text-base font-semibold text-gray-900">
			{produkt.name}
		</h2>

		<p class="text-sm font-medium text-blue-600">{produkt.preis} €</p>

		<p class="line-clamp-1 text-xs text-gray-500">{produkt.category}</p>
	</div>

	<!-- Actions -->
	<div class="p-3">
		<button class={`p-2 rounded-lg text-xs  ${user ? 'text-blue-400 border border-blue-400 cursor-pointer' : 'text-gray-300 border border-gray-300'} `}>
			Add to Cart
		</button>
	</div>
		 </div>
</div>
