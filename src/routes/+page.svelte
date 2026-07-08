<script lang="ts">
	import { onMount } from 'svelte';

	let currentSlide = $state(0);

	const images = {
		heroMouse: '/neural.avif',
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

