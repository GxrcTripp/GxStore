<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import logo from "$lib/assets/logo.png"; // Importamos tu logo
	import { dbProductos } from "$lib/db/productos"; // Importamos la DB para las sugerencias de búsqueda
	import { page } from "$app/stores"; // Importamos la tienda de la página
	import { goto } from "$app/navigation"; // Importamos goto para redirigir dinámicamente
	import { cart } from "$lib/cart.svelte"; // Importamos el estado global de tu carrito (Corregido a $lib)

	let { children } = $props();

	// Estado para la barra de búsqueda del Header
	let globalSearchQuery = $state("");
	let showDropdown = $state(false);

	// Estado para abrir/cerrar la vista rápida del carrito en el header
	let mostrarCarritoFlotante = $state(false);

	// Obtener sugerencias reactivas en tiempo real basadas en la db de productos
	let sugerencias = $derived(() => {
		if (!globalSearchQuery.trim()) return [];
		return dbProductos
			.filter((p) =>
				p.nombre
					.toLowerCase()
					.includes(globalSearchQuery.toLowerCase()),
			)
			.slice(0, 4); // Limitamos a 4 sugerencias para mantenerlo estético
	});

	// Enviar búsqueda a la página de la tienda
	function ejecutarBusqueda(query: string) {
		if (!query.trim()) return;
		showDropdown = false;
		goto(`/store?search=${encodeURIComponent(query)}`);
	}

	// Manejar el submit por tecla Enter
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === "Enter") {
			ejecutarBusqueda(globalSearchQuery);
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header
	class="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-primary/20 shadow-[0_0_15px_rgba(221,183,255,0.1)] flex justify-between items-center px-margin-desktop h-20"
>
	<div class="flex items-center gap-gutter">
		<!-- LOGO + NOMBRE (Clickeable para ir al Inicio) -->
		<a href="/" class="flex items-center gap-4 group focus:outline-none">
			<img
				src={logo}
				alt="Logo GxStore"
				class="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
			/>
			<!-- Línea divisoria vertical estética -->
			<div
				class="h-6 w-[1.5px] bg-outline-variant/30 rounded-full transition-colors duration-300 group-hover:bg-primary/40"
			></div>

			<span
				class="font-headline-lg text-headline-lg font-bold text-primary tracking-tighter group-hover:text-primary-hover transition-colors duration-300"
			>
				GxStore
			</span>
		</a>

		<!-- NAVEGACIÓN (Sin la pestaña Home) -->
		<nav class="hidden md:flex items-center gap-stack-lg ml-6">
			<!-- Enlaces dinámicos -->
			<a
				class="font-label-md text-label-md transition-all pb-1 {$page
					.url.pathname === '/store'
					? 'text-primary border-b-2 border-primary'
					: 'text-on-surface-variant hover:text-primary'}"
				href="/store">Store</a
			>
			<a
				class="font-label-md text-label-md transition-all pb-1 {$page
					.url.pathname === '/contact'
					? 'text-primary border-b-2 border-primary'
					: 'text-on-surface-variant hover:text-primary'}"
				href="/contact">Contact</a
			>
			<a
				class="font-label-md text-label-md transition-all pb-1 {$page
					.url.pathname === '/about-us'
					? 'text-primary border-b-2 border-primary'
					: 'text-on-surface-variant hover:text-primary'}"
				href="/about-us">About Us</a
			>
		</nav>
	</div>

	<!-- ACCIONES: BÚSQUEDA + CARRITO + CONECTAR -->
	<div class="flex items-center gap-stack-md">
		<!-- BARRA DE BÚSQUEDA INTERACTIVA -->
		<div class="relative hidden lg:block">
			<div
				class="flex items-center bg-surface-container-low border border-outline-variant/30 px-4 py-2 rounded-full focus-within:border-primary/50 focus-within:shadow-[0_0_10px_rgba(221,183,255,0.2)] transition-all duration-300"
			>
				<button
					onclick={() => ejecutarBusqueda(globalSearchQuery)}
					aria-label="Buscar"
					class="focus:outline-none flex items-center"
				>
					<span
						class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors mr-2 cursor-pointer"
						>search</span
					>
				</button>
				<input
					class="bg-transparent border-none focus:ring-0 text-body-md text-white/90 placeholder:text-outline/70 w-48 focus:outline-none"
					placeholder="Search elite gear..."
					type="text"
					bind:value={globalSearchQuery}
					onkeydown={handleKeyDown}
					onfocus={() => (showDropdown = true)}
					onblur={() => setTimeout(() => (showDropdown = false), 200)}
				/>
			</div>

			<!-- DROPDOWN DE SUGERENCIAS FLOTANTE CON IMÁGENES -->
			{#if showDropdown && globalSearchQuery.trim() !== ""}
				<div
					class="absolute left-0 right-0 mt-2 bg-surface-container-low border border-outline-variant/40 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-md"
				>
					{#if sugerencias().length > 0}
						<ul class="flex flex-col py-2">
							{#each sugerencias() as producto}
								<li>
									<button
										class="w-full text-left px-4 py-2 hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between gap-3"
										onclick={() => {
											globalSearchQuery = producto.nombre;
											ejecutarBusqueda(producto.nombre);
										}}
									>
										<div
											class="flex items-center gap-3 min-w-0"
										>
											<!-- Cajita contenedora de la imagen del producto -->
											<div
												class="w-10 h-10 bg-background/50 border border-outline-variant/20 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
											>
												<img
													src={producto.img}
													alt={producto.nombre}
													class="w-full h-full object-contain p-1"
												/>
											</div>
											<!-- Nombre del producto -->
											<span
												class="truncate text-sm text-white/80 group-hover:text-primary font-medium"
											>
												{producto.nombre}
											</span>
										</div>
										<!-- Precio -->
										<span
											class="text-xs text-primary/75 font-semibold shrink-0"
										>
											${producto.precio}
										</span>
									</button>
								</li>
							{/each}
						</ul>
					{:else}
						<div
							class="px-4 py-3 text-xs text-on-surface-variant/70 italic text-center"
						>
							No match found for "{globalSearchQuery}"
						</div>
					{/if}
				</div>
			{/if}
		</div>

<!-- CARRITO DE COMPRAS INTERACTIVO -->
        <div class="relative">
            <button
                class="relative p-2.5 rounded-full bg-surface-container-low hover:bg-primary/15 border border-outline-variant/30 text-on-surface-variant hover:text-primary transition-all duration-200 flex items-center justify-center focus:outline-none cursor-pointer"
                onclick={() =>
                    (mostrarCarritoFlotante = !mostrarCarritoFlotante)}
                aria-label="Abrir carrito"
            >
                <!-- Icono de Carrito SVG -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-5 h-5"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                </svg>

                <!-- Burbuja de Notificación reactiva -->
                {#if cart.totalItems > 0}
                    <span
                        class="absolute -top-1 -right-1 bg-primary text-background font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_8px_rgba(221,183,255,0.6)]"
                    >
                        {cart.totalItems}
                    </span>
                {/if}
            </button>

            <!-- DROPDOWN FLOTANTE DEL CARRITO -->
            {#if mostrarCarritoFlotante}
                <!-- Botón invisible de fondo para cerrar el dropdown al clickear fuera -->
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div
                    class="fixed inset-0 z-40"
                    onclick={() => (mostrarCarritoFlotante = false)}
                ></div>

                <div
                    class="absolute right-0 mt-3 w-85 bg-surface-container-low border border-outline-variant/40 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-md"
                >
                    <!-- Cabecera del Dropdown -->
                    <div
                        class="p-4 border-b border-outline-variant/30 flex justify-between items-center"
                    >
                        <p class="font-bold text-sm text-white">Tu Carrito</p>
                        <p class="text-xs text-primary/80 font-semibold">
                            {cart.totalItems} {cart.totalItems === 1 ? 'producto' : 'productos'}
                        </p>
                    </div>

                    <!-- Lista de productos añadidos -->
                    <div
                        class="max-h-64 overflow-y-auto divide-y divide-outline-variant/15"
                    >
                        {#if cart.items.length === 0}
                            <div
                                class="p-8 text-center text-xs text-on-surface-variant/60 italic"
                            >
                                <p>Tu carrito está vacío. ¡Equípate en la tienda!</p>
                            </div>
                        {:else}
                            {#each cart.items as item}
                                <div class="p-3 flex items-center gap-3">
                                    <!-- Miniatura en cajita -->
                                    <div
                                        class="w-12 h-12 bg-background/50 border border-outline-variant/20 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                                    >
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            class="w-full h-full object-contain p-0.5"
                                        />
                                    </div>

                                    <!-- Info del producto con doble precio -->
                                    <div class="flex-1 min-w-0 space-y-0.5">
                                        <h4 class="text-xs font-semibold text-white truncate">
                                            {item.title}
                                        </h4>
                                        <!-- Precio en USD -->
                                        <p class="text-[11px] text-primary font-bold font-code">
                                            ${item.price.toFixed(2)} <span class="text-[9px] text-primary/60 font-normal">x{item.cantidad}</span>
                                        </p>
                                        <!-- Conversión individual a Bs (Tasa BCV del Carrito) -->
                                        {#if cart.tasaBCV > 0}
                                            <p class="text-[10px] text-on-surface-variant/70 font-medium">
                                                Bs. {new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.price * cart.tasaBCV * item.cantidad)}
                                            </p>
                                        {/if}
                                    </div>

                                    <!-- Botones de control rápido -->
                                    <div class="flex items-center gap-1 shrink-0">
                                        <button
                                            class="w-5 h-5 rounded-md bg-background hover:bg-error/20 hover:text-error text-white/60 text-xs flex items-center justify-center transition-all font-bold cursor-pointer"
                                            onclick={() => cart.eliminar(item.id)}
                                        >
                                            -
                                        </button>
                                        <button
                                            class="w-5 h-5 rounded-md bg-background hover:bg-primary/20 hover:text-primary text-white/60 text-xs flex items-center justify-center transition-all font-bold cursor-pointer"
                                            onclick={() => cart.agregar(item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            {/each}
                        {/if}
                    </div>

                    <!-- Footer con desglose total en ambas monedas -->
                    {#if cart.items.length > 0}
                        <div
                            class="p-4 bg-background/30 border-t border-outline-variant/30 flex flex-col gap-3"
                        >
                            <!-- Bloque de Totales Compuestos -->
                            <div class="flex flex-col gap-1 border-b border-outline-variant/10 pb-2">
                                <!-- Fila USD -->
                                <div class="flex justify-between items-center">
                                    <p class="text-white/60 text-xs">Total en USD:</p>
                                    <p class="text-sm font-bold text-primary font-code">
                                        ${cart.totalPrecio.toFixed(2)}
                                    </p>
                                </div>
                                
                                <!-- Fila Bolívares (BCV) -->
                                {#if cart.tasaBCV > 0}
                                    <div class="flex justify-between items-center">
                                        <p class="text-on-surface-variant/80 text-[11px]">Total estimado en Bs:</p>
                                        <p class="text-xs font-semibold text-white/90">
                                            Bs. {new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cart.totalPrecioBs)}
                                        </p>
                                    </div>
                                {:else}
                                    <div class="flex justify-between items-center">
                                        <p class="text-[10px] text-outline animate-pulse">Sincronizando tasa oficial...</p>
                                    </div>
                                {/if}
                            </div>

                            <button
                                class="w-full py-2.5 bg-primary hover:bg-primary/90 text-background font-bold text-xs rounded-xl transition-colors shadow-lg shadow-primary/10 uppercase tracking-wider cursor-pointer font-bold"
                                onclick={() => {
                                    alert(`¡Gracias por simular tu compra!\nTotal procesado: $${cart.totalPrecio.toFixed(2)}`);
                                    cart.limpiar();
                                    mostrarCarritoFlotante = false;
                                }}
                            >
                                Proceder al Pago
                            </button>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>

		<button
			class="bg-primary text-on-primary px-6 py-2 rounded-full font-bold active:scale-95 transition-all neon-glow"
		>
			Connect
		</button>
	</div>
</header>

<!-- Le aplicamos bg-background aquí para que no se vea blanco -->
<main class="pt-20 bg-background min-h-screen text-on-background">
	{@render children()}
</main>

<footer
	class="w-full py-stack-lg bg-surface-container-lowest border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-gutter"
>
	<!-- SECCIÓN IZQUIERDA: LOGO | TEXTOS -->
	<div class="flex items-center gap-4 self-center md:self-start">
		<img
			src={logo}
			alt="Logo GxStore"
			class="h-12 w-auto object-contain opacity-90"
		/>
		<!-- Línea divisoria vertical estética en el footer -->
		<div class="h-10 w-[1.5px] bg-outline-variant/30 rounded-full"></div>

		<div class="flex flex-col text-left">
			<h2
				class="font-headline-lg text-headline-lg text-primary font-bold leading-none"
			>
				GxStore
			</h2>
			<p
				class="font-label-md text-label-md text-on-surface-variant mt-1.5"
			>
				© 2026 GxStore. ALL RIGHTS RESERVED.
			</p>
		</div>
	</div>

	<div class="flex gap-stack-lg">
		<a
			class="font-label-md text-label-md text-on-tertiary-container hover:text-primary transition-colors hover:underline"
			href="/privacy">Privacy</a
		>
		<a
			class="font-label-md text-label-md text-on-tertiary-container hover:text-primary transition-colors hover:underline"
			href="/terms">Terms</a
		>
		<a
			class="font-label-md text-label-md text-on-tertiary-container hover:text-primary transition-colors hover:underline"
			href="/support">Support</a
		>
	</div>

	<div class="flex gap-stack-md">
		<a
			aria-label="Follow us on X"
			class="text-on-surface-variant hover:text-primary transition-all"
			href="https://x.com"
		>
			<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"
				><path
					d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
				></path></svg
			>
		</a>
		<a
			aria-label="Follow us on Instagram"
			class="text-on-surface-variant hover:text-primary transition-all"
			href="https://instagram.com"
		>
			<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"
				><path
					d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
				></path></svg
			>
		</a>
	</div>
</footer>
