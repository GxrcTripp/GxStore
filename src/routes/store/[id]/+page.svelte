<script lang="ts">
    import { onMount } from 'svelte';
    import { dbProductos } from '$lib/db/productos';
    import { page } from '$app/state'



</script>
<div>
{#each dbProductos as producto }
    {#if producto.id}
<div class= flex >
    <img src="{producto.img}" alt="{producto.nombre}">

    
        <p class="text-2xl">{producto.marca} {producto.nombre}</p>
        <p class="text-xl">{producto.descripcion}</p>
        <p class="text-xl">${producto.precio}</p>
        <p class="text-xl">Cantidad en Stock: {producto.stock}</p>
</div>
    {/if}
{/each}


</div>