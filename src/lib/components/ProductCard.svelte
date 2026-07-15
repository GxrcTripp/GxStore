<script lang="ts">
    import { cart } from '$lib/cart.svelte';
    
    // 1. Declaramos los props en Svelte 5. 
    // Si tu prop se llama 'producto', lo desestructuramos así:
    let { producto } = $props<{
        producto: {
            id: string | number;
            nombre: string;
            precio: number;
            img: string;
        }
    }>();
</script>

<!-- Tu marcado HTML de la tarjeta -->
<div class="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex flex-col gap-4">
    <img src={producto.img} alt={producto.nombre} class="w-full h-40 object-contain" />
    
    <div class="flex flex-col gap-1">
        <h3 class="text-white font-bold text-lg">{producto.nombre}</h3>
        <p class="text-primary font-bold">${producto.precio}</p>
    </div>

    <!-- 2. Al hacer clic, le pasamos exactamente la variable 'producto' -->
    <button 
        onclick={() => cart.agregar(producto)} 
        class="w-full py-2 bg-primary hover:bg-primary-hover text-background font-bold rounded-xl transition-all duration-200"
    >
        Add to Cart
    </button>
</div>