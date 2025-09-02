<script>
	import { enhance } from '$app/forms';

	let { open = $bindable() } = $props();

	let name = $state('');
	let isValid = $state(false);

	$effect(() => {
		isValid = name.trim() !== '';
	});

	let loading = $state(false);
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
	<div class="w-full max-w-lg transform rounded-2xl bg-white p-6 shadow-2xl">
		<h2 class="mb-2 text-xl font-bold">Create New Category</h2>
		<p class="mb-6 text-sm">Please provide the details to set up the new category.</p>

		<form
			action="?/createCategory"
			method="POST"
			enctype="multipart/form-data"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update({ reset: false });
					open = false;
					loading = false;
				};
			}}
			class="space-y-5"
		>
			<div>
				<label for="name" class="mb-1 block text-sm font-medium"> Category Name </label>
				<input
					id="name"
					type="text"
					name="name"
					placeholder="Enter category name"
					required
					bind:value={name}
					class="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 shadow-sm"
				/>
			</div>

			<div class="flex justify-end gap-3 pt-4">
				<button
					type="reset"
					onclick={() => (open = false)}
					class="rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
				>
					Cancel
				</button>
				<button
					disabled={!isValid || loading}
					class={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow transition 
                        ${isValid && !loading ? 'bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-400' : 'cursor-not-allowed bg-red-300'}`}
				>
					{#if loading}
						<div
							class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
						></div>
					{/if}
					<span>{loading ? 'Creating...' : 'Create'}</span>
				</button>
			</div>
		</form>
	</div>
</div>
