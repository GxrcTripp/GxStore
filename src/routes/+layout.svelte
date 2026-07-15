<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores'; // Importamos la tienda de la página

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-primary/20 shadow-[0_0_15px_rgba(221,183,255,0.1)] flex justify-between items-center px-margin-desktop h-20">
	<div class="flex items-center gap-gutter">
		<h1 class="font-headline-lg text-headline-lg font-bold text-primary tracking-tighter">GxStore ©</h1>
		<nav class="hidden md:flex items-center gap-stack-lg">
			<!-- Enlaces dinámicos -->
			<a class="font-label-md text-label-md transition-all pb-1 {$page.url.pathname === '/' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}" href="/">Home</a>
			<a class="font-label-md text-label-md transition-all pb-1 {$page.url.pathname === '/store' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}" href="/store">Store</a>
			<a class="font-label-md text-label-md transition-all pb-1 {$page.url.pathname === '/about-us' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}" href="/about-us">About Us</a>
			<a class="font-label-md text-label-md transition-all pb-1 {$page.url.pathname === '/contact' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}" href="/contact">Contact</a>
		</nav>
	</div>
	<div class="flex items-center gap-stack-md">
		<div class="hidden lg:flex items-center bg-surface-container-low border border-outline-variant/30 px-4 py-2 rounded-full">
			<span class="material-symbols-outlined text-on-surface-variant mr-2">search</span>
			<input class="bg-transparent border-none focus:ring-0 text-body-md text-on-surface placeholder:text-outline w-48" placeholder="Search elite gear..." type="text"/>
		</div>
		<button class="bg-primary text-on-primary px-6 py-2 rounded-full font-bold active:scale-95 transition-all neon-glow">
			Connect
		</button>
	</div>
</header>

<!-- Le aplicamos bg-background aquí para que no se vea blanco -->
<main class="pt-20 bg-background min-h-screen text-on-background">
	{@render children()}
</main>

<footer class="w-full py-stack-lg bg-surface-container-lowest border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-gutter">
	<div class="flex flex-col items-center md:items-start gap-2">
		<h2 class="font-headline-lg text-headline-lg text-primary font-bold">GxStore</h2>
		<p class="font-label-md text-label-md text-on-surface-variant">© 2026 GxStore. ALL RIGHTS RESERVED.</p>
	</div>
	<div class="flex gap-stack-lg">
		<a class="font-label-md text-label-md text-on-tertiary-container hover:text-primary transition-colors hover:underline" href="/privacy">Privacy</a>
		<a class="font-label-md text-label-md text-on-tertiary-container hover:text-primary transition-colors hover:underline" href="/terms">Terms</a>
		<a class="font-label-md text-label-md text-on-tertiary-container hover:text-primary transition-colors hover:underline" href="/support">Support</a>
	</div>
	<div class="flex gap-stack-md">
		<a aria-label="Follow us on X" class="text-on-surface-variant hover:text-primary transition-all" href="https://x.com">
			<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
		</a>
		<a aria-label="Follow us on Instagram" class="text-on-surface-variant hover:text-primary transition-all" href="https://instagram.com">
			<svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
		</a>
	</div>
</footer>