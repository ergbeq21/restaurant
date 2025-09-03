<script lang="ts">
	import CreateNewCategory from '$lib/components/categories/CreateNewCategory.svelte';
	import CreateNewProdukt from '$lib/components/products/CreateNewProdukt.svelte';
	import Produkt from '$lib/components/products/Produkt.svelte';
	import { Plus,Tags,CirclePlus,ChevronRight,ChevronLeft } from 'lucide-svelte';
	import SearchProdukts from '$lib/components/products/SearchProdukts.svelte';
	import DeleteCategories from '$lib/components/categories/DeleteCategories.svelte';

	let { data } = $props();
    //modals
	let createNewProdukt = $state(false);
	let createNewCategory = $state(false);

    //delete category modal
    let deleteCategory = $state(false);
    let categorieToDelete = $state(null);

    //produkt erstellen mit dem gewahlten category
    let chosenCategoryId = $state('')
 
</script>

{#if createNewProdukt}
	<CreateNewProdukt bind:open={createNewProdukt} categories={data.categories} bind:chosenCategoryId />
{/if}

{#if createNewCategory}
	<CreateNewCategory bind:open={createNewCategory} />
{/if}

{#if deleteCategory}
    <DeleteCategories bind:open={deleteCategory} categorie={categorieToDelete}/>
{/if}


<main class="ml-75 w-full overflow-y-auto p-3 mr-5 mt-2">

        <header class="w-full mb-4">
            <h1 class="flex flex-row items-center gap-2 text-2xl font-bold">
                <Tags />
                <span>Alle Produkte</span>
            </h1>
            <p class="text-gray-500">Verwalte deine Produkte hier.</p>
        </header>


        <section class="mb-6 flex w-full items-center justify-between">
            <SearchProdukts />

            <button
                disabled={data.categories.length == 0}
                class={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white transition 
                ${data.categories.length == 0 ? 'bg-blue-200 cursor-not-allowed' : 'bg-stone-600 hover:bg-stone-700 cursor-pointer'}`}
                onclick={() => (createNewCategory = true)}
            >
                <Plus size={18} /> Neues Categorie
            </button>
        </section>


        {#if data.products.length > 0 && data.categories.length > 0}

            {#each data.categories as category}
                <section class="mb-8">

                    <h2 class="mb-4 text-2xl font-bold text-gray-800 flex flex-row items-center justify-start gap-4">
                        {category.name}
                    </h2>
                    <div class="flex gap-4">
                    <button
                        class="h-48 w-48 flex-shrink-0 cursor-pointer rounded-lg border-2 border-dashed border-orange-400 bg-orange-50 flex flex-col items-center justify-center gap-2 text-gray-700 hover:bg-orange-100 transition"
                        onclick={() => (createNewProdukt = true, chosenCategoryId = category.id)}
                    >
                        <CirclePlus size={28} class="text-orange-500" />
                        <span class="text-center text-base font-semibold">Add new produkt in {category.name}</span>
                    </button>

                    <div class="flex gap-4 overflow-x-auto">
                        {#each data.products.filter(product => product.category === category.name) as product}
                            <Produkt produkt={product}/>
                        {/each}
                    </div>
                    </div>
                </section>
            {/each} 


        {:else if data.categories.length == 0}
        <div class="mt-20 flex flex-col items-center justify-center gap-4 text-center">
            <p class="text-gray-500">Noch keine Kategorien vorhanden. Erstelle die erste Kategorie!</p>
            <button
            class="flex items-center gap-2 rounded-lg border border-gray-400 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
            onclick={() => (createNewCategory = true)}
            >
            <Plus size={18} /> Neue Kategorie
            </button>
        </div>
        {:else}
        <div class="mt-50 flex flex-col items-center justify-center gap-4 text-center">
            <p class="text-gray-500">Noch keine Produkte vorhanden. Erstelle das erste Produkt!</p>
            <button
            class="flex items-center gap-2 rounded-lg border border-gray-400 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
            onclick={() => (createNewProdukt = true)}
            >
            <Plus size={18} /> Neues Produkt
            </button>
        </div>
        {/if}
</main>

