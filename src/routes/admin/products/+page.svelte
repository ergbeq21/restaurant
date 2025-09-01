<script lang="ts">
	import CreateNewCategory from '$lib/components/categories/CreateNewCategory.svelte';
	import CreateNewProdukt from '$lib/components/products/CreateNewProdukt.svelte';
	import Produkt from '$lib/components/products/Produkt.svelte';
	import { Plus,ChevronLeft,Tags,Search } from "lucide-svelte";

	let { data } = $props();
    let createNewProdukt = $state(false);
    let createNewCategory = $state(false);
</script>

{#if createNewProdukt}
    <CreateNewProdukt bind:open={createNewProdukt} categories={data.categories}/>
{/if}

{#if createNewCategory}
    <CreateNewCategory bind:open={createNewCategory} />
{/if}

<div class="flex">

    <aside class="flex flex-col justify-between w-80 h-screen sticky top-20 bg-stone-500 border-r border-gray-200 p-5">
        <div class="flex flex-col gap-3">
             <a href="/" class="bg-gray-100 flex flex-row items-center justify-between hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded w-full text-center">
                <ChevronLeft size={18}/> 
                <span class="mr-17">Go back</span>
            </a>

            <div class="mt-4 flex flex-col gap-2">
                <div class="flex flex-col gap-2">
                    <label for="category" class="block text-sm font-medium text-white">All Kategories</label>
                    <button class="p-2 text-white bg-white/20 w-full hover:bg-white/40 cursor-pointer">All Categories</button>
                </div>

                <div class="flex flex-col gap-2">
                    <label for="category" class="block text-sm font-medium text-white">Kategorien</label>
                    {#each data.categories as category}
                        <button class="p-2 text-white bg-white/20 w-full hover:bg-white/40 cursor-pointer flex justify-between">
                            {category.name}
                            <span>10</span>
                        </button>
                    {/each}
                </div>
            </div>
        </div>

        <div class="w-full">
            <button class="w-full cursor-pointer bg-white/30 text-white border border-white p-2 flex items-center justify-center" onclick={() => (createNewCategory = true)}>Create new category</button>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="p-6 w-full">
        <header class="w-full">
            <h1 class="text-2xl font-bold flex flex-row items-center gap-2 justify-start">
                 <Tags/>
                 <span>Produkte</span>
            </h1>
            <p class="text-gray-500">Verwalte deine Produkte hier.</p>
        </header>

        <!--actions-->
        <section class="mt-5 mb-4 flex items-center justify-between w-full">

            <div class="relative w-full max-w-md">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    class="w-70 border border-gray-300 rounded-md px-10 py-1.5 text-gray-700 placeholder-gray-400"
                    placeholder="Suche Produkte..."
                />
            </div>



             <button 
                    disabled={data.categories.length == 0}
                    class={`${data.categories.length == 0 ? 'bg-blue-200 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 transition'} flex items-center gap-2 rounded-lg  px-4 py-2 text-white font-medium `}
                    onclick={() => (createNewProdukt = true)}
                >
                    <Plus size={18} aria-label="Neues Produkt hinzufügen"/> Neues Produkt
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
            <div class="flex flex-col items-center justify-center gap-4 mt-50 text-center">
                <p class="text-gray-500">Noch keine Kategorien vorhanden. Erstelle die erste Kategorie!</p>
                <button 
                    class="flex items-center gap-2 rounded-lg border border-gray-400 px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 transition"
                    onclick={() => (createNewCategory = true)}
                >
                    <Plus size={18} /> Neue Kategorie
                </button>
            </div>
        {:else}
            <div class="flex flex-col items-center justify-center gap-4 mt-50 text-center">
                <p class="text-gray-500">Noch keine Produkte vorhanden. Erstelle das erste Produkt!</p>
                <button 
                    class="flex items-center gap-2 rounded-lg border border-gray-400 px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 transition"
                    onclick={() => (createNewProdukt = true)}
                >
                    <Plus size={18} /> Neues Produkt
                </button>
            </div>
        {/if}
    </main>

</div>
