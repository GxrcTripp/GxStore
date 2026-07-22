<script lang="ts">
    // 1. Importamos el store del carrito
    import { cart } from "$lib/cart.svelte";
    import { dbProductos } from "$lib/db/productos";

    // Definimos los props usando las runas de Svelte 5
    interface Props {
        product: {
            id: string;
            title: string;
            price: string; // Llega como string (ej: "1299" o "$1299")
            tag?: string;
            desc: string;
            img: string;
            category: string;
        };
        tasaBCV: number; // Recibimos la tasa oficial desde el catálogo padre
    }

    // Desestructuramos las propiedades que nos pasan
    let { product, tasaBCV }: Props = $props();

    // Limpiamos el precio en dólares para asegurar que sea un número puro
    let precioNumericoUSD = $derived(Number(product.price.replace("$", "")));

    // Calculamos reactivamente el precio en Bolívares basado en la tasa del BCV
    let precioBolivares = $derived(precioNumericoUSD * tasaBCV);

    // Función semántica para dar formato de miles y decimales a la moneda nacional
    function formatearBs(valor: number) {
        return new Intl.NumberFormat('es-VE', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(valor);
    }
</script>

<div
    class="glass-card rounded-xl overflow-hidden group cursor-pointer transition-all duration-500 flex flex-col justify-between h-full"
>

    <div>
    <a href={`/store/${product.id}`} aria-label={`Ver detalles de ${product.title}`}>
        <!-- Contenedor de la Imagen -->
        <div class="relative aspect-square overflow-hidden bg-black/10">
            <div
                class="absolute inset-0 bg-linear-to-t from-background/80 to-transparent z-10 group-hover:from-primary/20 transition-all duration-500"
            ></div>
            <img
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                alt={product.title}
                src={product.img}
            />

            {#if product.tag}
                <div class="absolute top-4 right-4 z-20">
                    <span
                        class="text-on-primary-container text-[11px] font-bold px-2 py-1 rounded uppercase tracking-widest {product.tag ===
                        'New'
                            ? 'bg-primary-container'
                            : 'bg-error-container text-error'}"
                    >
                        {product.tag === 'New' ? 'Nuevo' : product.tag}
                    </span>
                </div>
            {/if}
        </div>
        <!-- Información del Producto -->
        <div class="p-stack-md relative z-20">
            <div class="flex flex-col mb-3 gap-1">
                <!-- Título del Producto -->
                <h3
                    class="font-headline-lg text-[18px] font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1"
                >
                    {product.title}
                </h3>

                <!-- CONTENEDOR DE MONEDA DUAL -->
                <div class="flex flex-col gap-0.5 mt-1">
                    <p class="text-primary font-bold font-code text-headline-md neon-glow-text">
                        ${precioNumericoUSD.toFixed(2)} <span class="text-[10px] text-primary/70 font-normal uppercase tracking-wider">USD</span>
                    </p>
                    
                    {#if tasaBCV > 0}
                        <p class="text-xs text-on-surface-variant/80 font-medium">
                            Bs. {formatearBs(precioBolivares)} <span class="text-[9px] text-outline uppercase tracking-normal">(BCV)</span>
                        </p>
                    {:else}
                        <p class="text-[11px] text-outline animate-pulse">
                            Calculando Bs...
                        </p>
                    {/if}
                </div>
            </div>
            

            <!-- Descripción del Producto -->
            <p
                class="text-on-surface-variant font-label-md mb-4 line-clamp-2 text-sm leading-relaxed"
            >
                {product.desc}
            </p>
        </div>
    </a>
</div>

    <!-- Botones de Acción -->
    <div class="px-stack-md pb-stack-md relative z-20 mt-auto">
        <div class="flex gap-2">
            <button
                onclick={() =>
                    cart.agregar({
                        id: product.id,
                        title: product.title,
                        price: precioNumericoUSD, 
                        img: product.img,
                    })}
                class="flex-1 bg-surface-container-highest hover:bg-primary transition-all duration-300 text-on-surface hover:text-on-primary py-2 rounded-lg font-bold text-label-md uppercase tracking-tight active:scale-95 cursor-pointer"
            >
                Añadir al Carrito
            </button>
            
            <button
                aria-label="Añadir a favoritos"
                class="w-10 h-10 flex items-center justify-center border border-outline-variant/30 rounded-lg text-outline hover:text-primary hover:border-primary transition-all shrink-0 cursor-pointer"
            >
                <div class="flex items-center justify-center">
                    <span class="material-symbols-outlined text-[20px]">favorite</span>
                </div>
            </button>
        </div>
    </div>
</div>

<style>
    .glass-card {
        background: rgba(30, 11, 54, 0.4);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(221, 183, 255, 0.1);
    }
    
    .glass-card:hover {
        border: 1px solid rgba(221, 183, 255, 0.3);
        box-shadow: 0 0 20px rgba(221, 183, 255, 0.05);
    }
    
    .neon-glow-text {
        text-shadow: 0 0 8px rgba(221, 183, 255, 0.6);
    }
</style>