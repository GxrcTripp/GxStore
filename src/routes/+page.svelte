<script lang="ts">
	import { onMount } from 'svelte';

	let currentSlide = $state(0);

	const images = {
		heroMouse: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
		voidwalkerPC: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
		neuralKeyboard: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80',
		sonicHeadset: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80',
		horizonMonitor: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80'
	};

	let scrolled = $state(0);
	onMount(() => {
		const handleScroll = () => { scrolled = window.pageYOffset; };
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<style>
	.glass-card {
		background: rgba(30, 11, 54, 0.4);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(221, 183, 255, 0.1);
		transition: transform 0.2s ease-out;
	}
	.neon-glow {
		box-shadow: 0 0 20px rgba(221, 183, 255, 0.3);
	}
	.hero-gradient {
		background: radial-gradient(circle at 50% 50%, rgba(183, 109, 255, 0.15) 0%, rgba(15, 7, 22, 0) 70%);
	}
</style>

<header class="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-primary/20 shadow-[0_0_15px_rgba(221,183,255,0.1)] flex justify-between items-center px-margin-desktop h-20">
	<div class="flex items-center gap-gutter">
		<h1 class="font-headline-lg text-headline-lg font-bold text-primary tracking-tighter">NEON CORE</h1>
		<nav class="hidden md:flex items-center gap-stack-lg">
			<a class="text-primary border-b-2 border-primary pb-1 font-label-md text-label-md transition-all" href="/">Home</a>
			<a class="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="/catalog">Catalog</a>
			<a class="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="/about-us">About Us</a>
			<a class="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="/contact">Contact</a>
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

<main class="pt-20 bg-background text-on-background min-h-screen">
	<section class="relative min-h-217.5 flex flex-col justify-center overflow-hidden">
		<div class="absolute inset-0 hero-gradient"></div>
		<div class="relative z-10 px-margin-desktop container mx-auto">
			<div class="flex transition-transform duration-700 ease-out" style="transform: translateX(-{currentSlide * 100}%);">
				<div class="min-w-full flex flex-col md:flex-row items-center gap-section-gap">
					<div class="flex-1 space-y-stack-md">
						<span class="inline-block px-3 py-1 bg-primary/10 text-primary border-l-2 border-primary text-label-md font-bold">LEGENDARY SERIES</span>
						<h2 class="font-headline-xl text-headline-xl text-on-background max-w-xl">APEX NEURAL MOUSE V3</h2>
						<p class="text-body-lg text-on-surface-variant max-w-lg">Zero latency wireless performance with custom optical sensors and ultralight haptic response. Engineered for the 1%.</p>
						<div class="flex gap-stack-md pt-stack-md">
							<button class="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all active:scale-95 shadow-[0_0_20px_rgba(183,109,255,0.4)]">
								BUY NOW <span class="material-symbols-outlined">shopping_cart</span>
							</button>
							<button class="border border-primary/40 text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary/10 transition-all active:scale-95">
								DETAILS
							</button>
						</div>
					</div>
					<div class="flex-1 relative">
						<div class="w-full aspect-square glass-card rounded-full absolute -z-10 blur-3xl opacity-20 scale-150"></div>
						<img class="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(183,109,255,0.3)]" alt="Futuristic gaming mouse" src={images.heroMouse}/>
					</div>
				</div>
			</div>

			<div class="flex gap-stack-sm mt-stack-lg">
				<button aria-label="Go to slide 1" class="{currentSlide === 0 ? 'w-12 bg-primary' : 'w-8 bg-primary/20'} h-1 rounded-full transition-all" onclick={() => currentSlide = 0}></button>
				<button aria-label="Go to slide 2" class="{currentSlide === 1 ? 'w-12 bg-primary' : 'w-8 bg-primary/20'} h-1 rounded-full transition-all" onclick={() => currentSlide = 1}></button>
				<button aria-label="Go to slide 3" class="{currentSlide === 2 ? 'w-12 bg-primary' : 'w-8 bg-primary/20'} h-1 rounded-full transition-all" onclick={() => currentSlide = 2}></button>
			</div>
		</div>
	</section>

	<section class="py-section-gap px-margin-desktop bg-surface-container-lowest relative overflow-hidden">
		<div class="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
		<div class="flex justify-between items-end mb-stack-lg">
			<div>
				<h3 class="font-headline-lg text-headline-lg text-on-background">FEATURED RIGS</h3>
				<p class="text-on-surface-variant">Selected high-performance gear for elite gaming.</p>
			</div>
			<a class="text-primary font-label-md flex items-center gap-1 hover:underline" href="/catalog">
				VIEW CATALOG <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
			</a>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-gutter h-200">
			<div class="md:col-span-2 md:row-span-2 glass-card rounded-xl p-8 flex flex-col justify-between group overflow-hidden relative" style="transform: translateY({scrolled * 0.05}px)">
				<div class="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-700" style="background-image: url('{images.voidwalkerPC}')"></div>
				<div class="relative z-10">
					<span class="bg-primary text-on-primary text-[10px] font-bold px-2 py-1 rounded">ULTRA-TIER</span>
					<h4 class="font-headline-lg text-headline-lg mt-4">VOIDWALKER X1</h4>
					<p class="text-on-surface-variant max-w-xs mt-2">RTX 5090 Ready. Custom cooling. Zero compromise.</p>
				</div>
				<div class="relative z-10 flex justify-between items-center">
					<span class="font-headline-lg text-primary">$4,999</span>
					<button aria-label="Add Voidwalker X1 to cart" class="material-symbols-outlined bg-primary text-on-primary p-3 rounded-full hover:rotate-90 transition-transform">add</button>
				</div>
			</div>

			<div class="md:col-span-2 glass-card rounded-xl p-6 flex items-center gap-gutter relative overflow-hidden" style="transform: translateY({scrolled * 0.1}px)">
				<div class="flex-1">
					<h4 class="font-headline-lg text-headline-lg-mobile mb-2">NEURAL KEYBOARD</h4>
					<p class="text-on-surface-variant text-body-md">Rapid-fire magnetic switches with per-key RGB control.</p>
					<button class="mt-4 text-primary font-label-md flex items-center gap-2">TECH SPECS <span class="material-symbols-outlined text-[16px]">bolt</span></button>
				</div>
				<div class="w-1/2 h-full">
					<img class="w-full h-full object-contain" alt="Mechanical Keyboard" src={images.neuralKeyboard}/>
				</div>
			</div>

			<div class="glass-card rounded-xl p-6 flex flex-col justify-between hover:bg-primary/5 transition-colors">
				<div class="h-24">
					<img class="w-full h-full object-contain" alt="Sonic headset" src={images.sonicHeadset}/>
				</div>
				<div>
					<h5 class="font-bold text-on-surface">SONIC CORE H1</h5>
					<p class="text-label-md text-on-surface-variant">$249</p>
				</div>
			</div>
			
			<div class="glass-card rounded-xl p-6 flex flex-col justify-between hover:bg-primary/5 transition-colors">
				<div class="h-24">
					<img class="w-full h-full object-contain" alt="Horizon monitor" src={images.horizonMonitor}/>
				</div>
				<div>
					<h5 class="font-bold text-on-surface">HORIZON 49" QLED</h5>
					<p class="text-label-md text-on-surface-variant">$1,199</p>
				</div>
			</div>
		</div>
	</section>

	<section class="py-section-gap px-margin-desktop bg-background">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
			<div class="space-y-2">
				<div class="font-headline-xl text-primary font-extrabold">2.4ms</div>
				<div class="text-label-md text-outline uppercase tracking-widest font-bold">AVG RESPONSE</div>
			</div>
			<div class="space-y-2">
				<div class="font-headline-xl text-primary font-extrabold">99.9%</div>
				<div class="text-label-md text-outline uppercase tracking-widest font-bold">RELIABILITY</div>
			</div>
			<div class="space-y-2">
				<div class="font-headline-xl text-primary font-extrabold">12M+</div>
				<div class="text-label-md text-outline uppercase tracking-widest font-bold">USERS WORLDWIDE</div>
			</div>
			<div class="space-y-2">
				<div class="font-headline-xl text-primary font-extrabold">24/7</div>
				<div class="text-label-md text-outline uppercase tracking-widest font-bold">ELITE SUPPORT</div>
			</div>
		</div>
	</section>

	<section class="py-section-gap px-margin-desktop">
		<div class="glass-card rounded-2xl p-12 relative overflow-hidden flex flex-col items-center text-center gap-stack-lg border border-primary/20">
			<div class="absolute inset-0 bg-primary/5 pointer-events-none"></div>
			<div class="relative z-10 max-w-2xl">
				<h2 class="font-headline-xl text-headline-xl mb-4">JOIN THE CORE</h2>
				<p class="text-body-lg text-on-surface-variant">Get early access to limited edition drops, firmware updates, and community tournaments.</p>
			</div>
			<div class="relative z-10 flex w-full max-w-md bg-surface-container-low border border-outline-variant/30 rounded-lg p-1">
				<input class="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-on-surface placeholder:text-outline" placeholder="Enter your neural-link email" type="email"/>
				<button class="bg-primary text-on-primary px-8 py-3 rounded-md font-bold hover:brightness-110 active:scale-95 transition-all">SIGN UP</button>
			</div>
		</div>
	</section>
</main>

<footer class="w-full py-stack-lg bg-surface-container-lowest border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center px-margin-desktop gap-gutter">
	<div class="flex flex-col items-center md:items-start gap-2">
		<h2 class="font-headline-lg text-headline-lg text-primary font-bold">NEON CORE</h2>
		<p class="font-label-md text-label-md text-on-surface-variant">© 2026 NEON CORE. ALL RIGHTS RESERVED.</p>
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