<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header>
	<div>
		<p>GxStore</p>
		<a href="/">Home</a>
		<a href="/catalog">Catalog</a>
		<a href="/about-us">About Us</a>
		<a href="/contact">Contact</a>
	</div>

	<div>
		<div></div>
		<button>Connect</button>
	</div>
</header>

{@render children()}


<footer>Este es el footer</footer>