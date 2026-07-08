<script lang="ts">
	let mobileNavOpen = $state(false);
	let activeFilter = $state('All Gear');

	const categories = ['All Gear', 'Neural Links', 'Visual Cores', 'Tactile Mods'];

	const products = [
		{ id: 1, title: 'Neural-X Visor', price: '$2,499', tag: 'New', desc: 'High-frequency neural interfacing with 16K retina-sync displays.', img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80' },
		{ id: 2, title: 'Ghost-Touch G2', price: '$899', tag: '', desc: 'Precision haptic feedback system for tactile digital interaction.', img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80' },
		{ id: 3, title: 'Core Pulse v.9', price: '$1,250', tag: '', desc: 'Next-gen AI processing unit with 400 TFLOPS of neural power.', img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80' },
		{ id: 4, title: 'Neo-Type XL', price: '$299', tag: 'Sale', desc: 'Optical-mechanical keys with Zero-Latency wireless tech.', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80' },
		{ id: 5, title: 'Sonic Core Buds', price: '$450', tag: '', desc: 'Spatial audio integration with real-time neural noise cancellation.', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80' },
		{ id: 6, title: 'Quantum Hub', price: '$620', tag: '', desc: 'Integrated power and data management for massive rig setups.', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80' },
		{ id: 7, title: 'Data Slate Prime', price: '$1,890', tag: '', desc: 'Portable high-density computation unit with edge-lit glass display.', img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80' },
		{ id: 8, title: 'Augment-A1 Link', price: '$3,200', tag: '', desc: 'Direct limb-to-neural connection module for sub-ms reaction speeds.', img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80' }
	];

	let isSearchFocused = $state(false);
</script>

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
	.neon-button-glow:hover {
		box-shadow: 0 0 15px rgba(221, 183, 255, 0.4);
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>

<main class="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-background text-on-background min-h-screen">
	<header class="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
		<div>
			<h1 class="font-headline-xl text-headline-xl text-primary mb-2 neon-glow-text">Product Catalog</h1>
			<p class="text-on-surface-variant max-w-xl font-body-lg text-body-lg">Explore our curated selection of elite digital hardware and neural enhancements. Performance redefined for the next generation.</p>
		</div>
		<div class="flex gap-stack-sm overflow-x-auto pb-2 scrollbar-hide">
			{#each categories as category}
				<button 
					onclick={() => activeFilter = category}
					class="px-4 py-2 rounded-lg transition-all font-label-md text-label-md cursor-pointer whitespace-nowrap {activeFilter === category ? 'bg-primary-container/20 text-primary border-l-4 border-primary' : 'bg-surface-container-highest/50 text-on-surface-variant border border-transparent hover:bg-surface-container-highest'}"
				>
					{category}
				</button>
			{/each}
		</div>
	</header>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
		{#each products as product}
			<div class="glass-card rounded-xl overflow-hidden group cursor-pointer transition-all duration-500">
				<div class="relative aspect-square overflow-hidden">
					<div class="absolute inset-0 bg-linear-to-t from-background/80 to-transparent z-10 group-hover:from-primary/20 transition-all duration-500"></div>
					<img class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt={product.title} src={product.img}/>
					{#if product.tag}
						<div class="absolute top-4 right-4 z-20">
							<span class="text-on-primary-container text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest {product.tag === 'New' ? 'bg-primary-container' : 'bg-error-container text-error'}">{product.tag}</span>
						</div>
					{/if}
				</div>
				<div class="p-stack-md relative z-20">
					<div class="flex justify-between items-start mb-2">
						<h3 class="font-headline-lg text-[20px] text-on-surface group-hover:text-primary transition-colors">{product.title}</h3>
						<div class="text-primary font-bold font-code text-body-lg neon-glow-text">{product.price}</div>
					</div>
					<p class="text-on-surface-variant font-label-md mb-4 line-clamp-2">{product.desc}</p>
					<div class="flex gap-2">
						<button class="flex-1 bg-surface-container-highest group-hover:bg-primary transition-all duration-300 text-on-surface group-hover:text-on-primary py-2 rounded-lg font-bold text-label-md uppercase tracking-tight active:scale-95">Add to Cart</button>
						<button aria-label="Add to favorites" class="w-10 h-10 flex items-center justify-center border border-outline-variant/30 rounded-lg text-outline hover:text-primary hover:border-primary transition-all">
							<span class="material-symbols-outlined text-[20px]">favorite</span>
						</button>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-section-gap flex flex-col items-center gap-stack-md">
		<button class="px-12 py-4 border border-primary/30 rounded-lg bg-primary-container/10 text-primary font-headline-lg text-[20px] hover:bg-primary/20 hover:border-primary transition-all active:scale-95 neon-button-glow">Load More Gear</button>
		<p class="font-label-md text-label-md text-outline">Displaying 8 of 142 digital assets</p>
	</div>
</main>


<div class="fixed inset-0 z-100 transition-transform duration-500 md:hidden {mobileNavOpen ? 'translate-x-0' : 'translate-x-full'}" id="mobile-nav">
	<button aria-label="Close menu" class="absolute inset-0 bg-background/90 backdrop-blur-xl w-full h-full cursor-default" onclick={() => mobileNavOpen = false}></button>
	<div class="absolute right-0 top-0 h-screen w-64 bg-surface-container-low/95 backdrop-blur-2xl border-l border-primary/10 flex flex-col py-stack-lg shadow-2xl">
		<div class="px-8 mb-stack-lg">
			<div class="text-primary font-headline-lg-mobile text-headline-lg-mobile font-bold">NEON CORE</div>
			<div class="text-on-surface-variant font-label-md">Elite Digital Hub</div>
		</div>
		<nav class="flex flex-col flex-1">
			<a class="flex items-center gap-stack-sm text-on-surface-variant p-6 hover:bg-primary-container/10 hover:text-primary transition-all" href="/">
				<span class="material-symbols-outlined">home</span>
				<span class="font-body-md text-body-md">Home</span>
			</a>
			<a class="flex items-center gap-stack-sm bg-primary-container/20 text-primary border-l-4 border-primary p-6 transition-all" href="/catalog">
				<span class="material-symbols-outlined">grid_view</span>
				<span class="font-body-md text-body-md">Catalog</span>
			</a>
			<a class="flex items-center gap-stack-sm text-on-surface-variant p-6 hover:bg-primary-container/10 hover:text-primary transition-all" href="/about-us">
				<span class="material-symbols-outlined">info</span>
				<span class="font-body-md text-body-md">About Us</span>
			</a>
			<a class="flex items-center gap-stack-sm text-on-surface-variant p-6 hover:bg-primary-container/10 hover:text-primary transition-all" href="/contact">
				<span class="material-symbols-outlined">mail</span>
				<span class="font-body-md text-body-md">Contact</span>
			</a>
		</nav>
		<div class="px-6">
			<button class="w-full bg-primary text-on-primary py-3 rounded-lg font-bold">Shop Now</button>
		</div>
	</div>
</div>

<button aria-label="Open menu" class="fixed bottom-6 right-6 z-110 md:hidden w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all" onclick={() => mobileNavOpen = !mobileNavOpen}>
	<span class="material-symbols-outlined">menu</span>
</button>