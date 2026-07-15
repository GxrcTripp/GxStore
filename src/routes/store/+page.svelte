<script lang="ts">
    import Tarjeta from '$lib/components/Tarjeta.svelte';
    import { dbProductos } from '$lib/db/productos';
    import { page } from '$app/state'; // Importamos el estado de la página para leer la URL

    let mobileNavOpen = $state(false);

    // Inicializamos la query de búsqueda leyendo el parámetro 'search' de la URL
    let urlSearch = page.url.searchParams.get('search') || '';
    let buscarQuery = $state(urlSearch);
    
    // Categorías unificadas en español
    const categories = ['Todos los Productos', 'computacion', 'perifericos', 'conectividad-y-redes', 'mobiliario'];

    // Inicializamos el filtro activo leyendo el parámetro 'category'
    let urlCategory = page.url.searchParams.get('category');
    let activeFilter = $state(
        categories.includes(urlCategory || '') ? urlCategory : 'Todos los Productos'
    );
    
    let precioMaximo = $state(2000);

    // Mapeo limpio a español
    const products = dbProductos.map(p => ({
        id: p.id,
        title: p.nombre,          
        price: `$${p.precio}`,    
        priceNumeric: p.precio,   
        tag: '', 
        category: p.categoria,    
        desc: p.descripcion,      
        img: p.img                
    }));

    // Lógica de filtrado reactivo (Reacciona al cambio de buscarQuery que viene de la URL)
    let filteredProducts = $derived(() => {
        return products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(buscarQuery.toLowerCase()) || 
                                  product.desc.toLowerCase().includes(buscarQuery.toLowerCase());
            
            const matchesCategory = activeFilter === 'Todos los Productos' || product.category === activeFilter;
            const matchesPrice = product.priceNumeric <= precioMaximo;

            return matchesSearch && matchesCategory && matchesPrice;
        });
    });

    // Efecto reactivo para actualizar la búsqueda si la URL cambia estando ya en la tienda
    $effect(() => {
        const queryInUrl = page.url.searchParams.get('search') || '';
        if (queryInUrl !== buscarQuery) {
            buscarQuery = queryInUrl;
        }
    });
</script>

<style>
    .glass-card {
        background: rgba(30, 11, 54, 0.4);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(221, 183, 255, 0.1);
    }
    .neon-glow-text {
        text-shadow: 0 0 8px rgba(221, 183, 255, 0.6);
    }
</style>

<main class="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-background text-on-background min-h-screen">
    <!-- CABECERA -->
    <header class="mb-10">
        <h1 class="font-headline-xl text-headline-xl text-primary mb-2 neon-glow-text">Tienda de Hardware</h1>
        <p class="text-on-surface-variant max-w-xl font-body-lg text-body-lg">
            Explora nuestro catálogo de hardware premium. Equipamiento de alto rendimiento seleccionado para entusiastas y profesionales.
        </p>
    </header>

    <!-- CONTENEDOR PRINCIPAL: SIDEBAR + GRID -->
    <div class="flex flex-col lg:flex-row gap-8">
        
        <!-- BARRA LATERAL DE FILTROS -->
        <aside class="w-full lg:w-64 shrink-0 space-y-6">
            <div class="glass-card rounded-xl p-6 space-y-6 border border-outline-variant/20">
                <p class="font-bold text-md uppercase tracking-wider text-primary neon-glow-text">Filtros de Búsqueda</p>
                
                <!-- Buscador de Texto -->
                <div class="space-y-2">
                    <label for="search" class="text-xs font-bold uppercase text-on-surface-variant">Buscar Equipamiento</label>
                    <input 
                        id="search"
                        type="text" 
                        bind:value={buscarQuery}
                        placeholder="Ej. Razer, Laptop, Router..." 
                        class="w-full bg-black/20 border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-on-surface transition-all"
                    />
                </div>

                <!-- Filtro de Categorías -->
                <div class="space-y-2">
                    <p class="text-xs font-bold uppercase text-on-surface-variant">Categorías</p>
                    <div class="flex flex-col gap-1.5 text-sm">
                        {#each categories as category}
                            <button 
                                onclick={() => activeFilter = category}
                                class="text-left px-3 py-2 rounded-lg transition-all font-semibold capitalize {activeFilter === category ? 'bg-primary/20 text-primary border-l-4 border-primary font-bold' : 'hover:bg-white/5 text-on-surface-variant'}"
                            >
                                {category === 'Todos los Productos' ? 'Todo el Catálogo' : category.replace(/-/g, ' ')}
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Filtro Deslizante de Precio -->
                <div class="space-y-2">
                    <div class="flex justify-between items-center text-xs font-bold uppercase text-on-surface-variant">
                        <span>Precio Máximo</span>
                        <span class="text-primary font-mono font-bold">${precioMaximo}</span>
                    </div>
                    <input 
                        type="range" 
                        min="20" 
                        max="2000" 
                        step="10"
                        bind:value={precioMaximo}
                        class="w-full accent-primary bg-black/30 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </aside>

        <!-- CUADRÍCULA DE PRODUCTOS -->
        <div class="flex-1 space-y-6">
            <div class="flex justify-between items-center">
                <p class="text-on-surface-variant text-sm">
                    Mostrando <span class="text-primary font-bold">{filteredProducts().length}</span> componentes locales
                </p>
            </div>

            {#if filteredProducts().length > 0}
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-gutter">
                    {#each filteredProducts() as product (product.id)}
                        <Tarjeta {product} />
                    {/each}
                </div>
            {:else}
                <!-- Estado Vacío -->
                <div class="glass-card rounded-xl p-12 text-center flex flex-col items-center justify-center gap-4">
                    <span class="material-symbols-outlined text-outline text-5xl">database_off</span>
                    <div>
                        <p class="font-bold text-lg text-on-surface">No hay hardware que coincida</p>
                        <p class="text-on-surface-variant text-sm mt-1">Prueba subiendo el presupuesto o afinando el texto del buscador.</p>
                    </div>
                </div>
            {/if}
        </div>

    </div>

    <!-- PIE DE PÁGINA -->
    <div class="mt-section-gap flex flex-col items-center gap-stack-md">
        <p class="font-label-md text-label-md text-outline">Visualizando {filteredProducts().length} productos de tu base de datos local</p>
    </div>
</main>

<!-- MENÚ MÓVIL EN ESPAÑOL -->
<div class="fixed inset-0 z-100 transition-transform duration-500 md:hidden {mobileNavOpen ? 'translate-x-0' : 'translate-x-full'}" id="mobile-nav">
    <button aria-label="Cerrar menú" class="absolute inset-0 bg-background/90 backdrop-blur-xl w-full h-full cursor-default" onclick={() => mobileNavOpen = false}></button>
    <div class="absolute right-0 top-0 h-screen w-64 bg-surface-container-low/95 backdrop-blur-2xl border-l border-primary/10 flex flex-col py-stack-lg shadow-2xl">
        <div class="px-8 mb-stack-lg">
            <div class="text-primary font-headline-lg-mobile text-headline-lg-mobile font-bold">NEON CORE</div>
            <div class="text-on-surface-variant font-label-md">Elite Digital Hub</div>
        </div>
        <nav class="flex flex-col flex-1">
            <a class="flex items-center gap-stack-sm text-on-surface-variant p-6 hover:bg-primary-container/10 hover:text-primary transition-all" href="/">
                <span class="material-symbols-outlined">home</span>
                <span class="font-body-md text-body-md">Inicio</span>
            </a>
            <a class="flex items-center gap-stack-sm bg-primary-container/20 text-primary border-l-4 border-primary p-6 transition-all" href="/store">
                <span class="material-symbols-outlined">grid_view</span>
                <span class="font-body-md text-body-md">Tienda</span>
            </a>
            <a class="flex items-center gap-stack-sm text-on-surface-variant p-6 hover:bg-primary-container/10 hover:text-primary transition-all" href="/about-us">
                <span class="material-symbols-outlined">info</span>
                <span class="font-body-md text-body-md">Sobre Nosotros</span>
            </a>
            <a class="flex items-center gap-stack-sm text-on-surface-variant p-6 hover:bg-primary-container/10 hover:text-primary transition-all" href="/contact">
                <span class="material-symbols-outlined">mail</span>
                <span class="font-body-md text-body-md">Contacto</span>
            </a>
        </nav>
        <div class="px-6">
            <button class="w-full bg-primary text-on-primary py-3 rounded-lg font-bold">Comprar Ahora</button>
        </div>
    </div>
</div>

<button aria-label="Abrir menú" class="fixed bottom-6 right-6 z-110 md:hidden w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all" onclick={() => mobileNavOpen = !mobileNavOpen}>
    <span class="material-symbols-outlined">menu</span>
</button>