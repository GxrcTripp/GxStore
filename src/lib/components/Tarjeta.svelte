<script lang="ts">
    // 1. Importamos el store del carrito
    import { cart } from "$lib/cart.svelte";

    // Definimos los props usando las runas de Svelte 5
    interface Props {
        product: {
            id: string;
            title: string;
            price: string;
            tag?: string;
            desc: string;
            img: string;
            category: string;
        };
    }

    let { product }: Props = $props();
</script>

<div
    class="glass-card rounded-xl overflow-hidden group cursor-pointer transition-all duration-500 flex flex-col justify-between h-full"
>
    <div>
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
                        class="text-on-primary-container text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest {product.tag ===
                        'New'
                            ? 'bg-primary-container'
                            : 'bg-error-container text-error'}"
                    >
                        {product.tag}
                    </span>
                </div>
            {/if}
        </div>

        <!-- Información del Producto -->
        <div class="p-stack-md relative z-20">
            <div class="flex justify-between items-start mb-2 gap-2">
                <h3
                    class="font-headline-lg text-[18px] font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1"
                >
                    {product.title}
                </h3>
                <div
                    class="text-primary font-bold font-code text-body-lg neon-glow-text whitespace-nowrap"
                >
                    {product.price}
                </div>
            </div>
            <p
                class="text-on-surface-variant font-label-md mb-4 line-clamp-2 text-sm leading-relaxed"
            >
                {product.desc}
            </p>
        </div>
    </div>

    <!-- Botones de Acción -->
    <div class="px-stack-md pb-stack-md relative z-20 mt-auto">
        <div class="flex gap-2">
            <!-- 2. Agregamos el evento onclick para añadir al carrito usando 'product' -->
            <button
                onclick={() =>
                    cart.agregar({
                        id: product.id,
                        title: product.title,
                        price: Number(product.price.replace("$", "")), // Quitamos el "$" y lo convertimos a número
                        img: product.img,
                    })}
                class="flex-1 bg-surface-container-highest hover:bg-primary transition-all duration-300 text-on-surface hover:text-on-primary py-2 rounded-lg font-bold text-label-md uppercase tracking-tight active:scale-95"
            >
                Add to Cart
            </button>
            <button
                aria-label="Add to favorites"
                class="w-10 h-10 flex items-center justify-center border border-outline-variant/30 rounded-lg text-outline hover:text-primary hover:border-primary transition-all shrink-0"
            >
                <span class="material-symbols-outlined text-[20px]"
                    >favorite</span
                >
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
