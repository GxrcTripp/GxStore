<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header>Hola este es el header</header>

{@render children()}


<footer>Este es el footer</footer>