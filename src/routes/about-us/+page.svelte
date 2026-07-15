<script lang="ts">
	const team = [
		{ name: 'Alex Void', role: 'Chief Architect', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX9iSajrX1ye8QAhpErh6fcDjd_ujxfgaJVg6IlrOyGUOfnqJEUzmY3gKewlfE2nJoHBcu2wtgRaPRbi_X2XDYPf9Cle3wweFun6xevQ4kPtLUOgKuKZ9C08MUV5rn36pQn1ubQVroLkqgOKMWL4z0pQlsa9Jk2i-bHXR4pi4hn2EYfAS3ISTpa9Kg1DDF28512RBbPpEDwAuSJqszCKg65h6LKkD9kQAwWPNcouBRz606CBK96XbFIxCUupPj8o8OQ0xrz-Y8jZQ' },
		{ name: 'Luna Cyber', role: 'Creative Director', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUiaNDErJdnxlfCSX7uZqbJPlGG2IMVFhIuleb9CyF6HaLp-z7zOH3EEQvNhKdtOTdcG4mYmGZ7J88G1sGIGnoajc-OjgDdsrejKWd5YoNqcaXTYkw9cezAoY0bXu7cbEWOqmERQFVLrDf0zUhzenlGrP8usCAtr4Fjeib6TYdPsDccucTstet-RyfdUKoHUMiR-Kq1NbCAyS1MO-_HqaNWYlFDEI8cv5AEcDQ2GQDpwKn_ku6HDw2pMOjk7orZfKPy49wARMTiuk' },
		{ name: 'Marcus Volt', role: 'Systems Lead', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdnxpG7J01kMtET19qnMz36XCFaltQsRAl87zxIJQYiWGR98KQOXQmT88piSSFfD-47jaNVb0N9hxvzXNMWxdUiO-C1YmAnT0kVz7-b0Z350XRAqKwi-tkfrffYk3jA-J5qm9A9op1J5TcZRxgTO-36OB7ikqZIPwvU_U8SpcFYw5zv7vvQHuH-nbyDGmRrgh4sj3fd6uwSq-HQ7IJlLXTo83RLHAwhC2orrX7Nce9qKbZalADxJ2vVd0k-Lk0NMuqIgD6wHaDfvY' }
	];
</script>

<style>
	.glass-panel {
		background: rgba(30, 11, 54, 0.4);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(221, 183, 255, 0.1);
	}
	.neon-text-glow {
		text-shadow: 0 0 20px rgba(221, 183, 255, 0.4);
	}
	@keyframes pulse-slow {
		0%, 100% { opacity: 0.3; transform: scale(1); }
		50% { opacity: 0.6; transform: scale(1.1); }
	}
	.ambient-glow {
		position: absolute;
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(132, 43, 210, 0.15) 0%, rgba(15, 7, 22, 0) 70%);
		border-radius: 50%;
		pointer-events: none;
		z-index: -1;
		filter: blur(80px);
		animation: pulse-slow 8s infinite ease-in-out;
	}
</style>

<main class="relative bg-background text-on-background min-h-screen pt-20 overflow-x-hidden selection:bg-primary/30 selection:text-primary">
	<div class="ambient-glow top-[10%] left-[-10%]"></div>
	<div class="ambient-glow top-[60%] right-[-5%]"></div>

	<section class="min-h-screen flex flex-col justify-center items-center text-center px-margin-mobile md:px-margin-desktop">
		<div class="max-w-container-max w-full">
			<span class="font-label-md text-label-md text-primary uppercase tracking-[0.3em] mb-stack-md block">Desde el Futuro</span>
			<h1 class="font-headline-xl text-headline-xl md:text-[84px] leading-tight mb-stack-lg neon-text-glow">
				Nuestra Historia
			</h1>
			<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto opacity-80">
				Construyendo el puente entre el hardware de vanguardia y la experiencia digital inmersiva definitiva.
			</p>
		</div>
		<div class="mt-section-gap w-full max-w-5xl h-100 md:h-150 rounded-xl overflow-hidden glass-panel relative group">
			<div class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDM7bEv--y7jcAbKr_WQkQ53ADMpjSoH8vL1O53SnVZXm1tcxYR1h1HnuqPxaWtmBgi4jqH_j5fTXOc6wNs1pmnYmOglFxwC3N9z-g443tOGMQe1u-yRZImUaCcg869ng36zeGSEyuTaGkt33SW0xAWxwJvLN5_cyHGTZDvVp6atBQ43xK0FNDBrp3GHVmQJdhB4am2m7Nn5WIOYMt6Zk86WE3qnDPP1qWpEuaIFfOV-wpM0twv9CuA0V8kMYgaAaaZsQgbEsenycE')"></div>
			<div class="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent"></div>
		</div>
	</section>

	<section class="py-section-gap px-margin-mobile md:px-margin-desktop">
		<div class="max-w-container-max mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
				<div class="md:col-span-7 glass-panel p-stack-lg rounded-xl flex flex-col justify-center min-h-100">
					<div class="flex items-center gap-stack-sm mb-stack-md text-primary">
						<span class="material-symbols-outlined text-4xl">rocket_launch</span>
						<h2 class="font-headline-lg text-headline-lg">Misión</h2>
					</div>
					<p class="font-body-lg text-body-lg text-on-surface-variant mb-stack-md">
						En NEON CORE, nuestra misión es democratizar el acceso a la tecnología de alto rendimiento. No solo vendemos components; entregamos las herramientas para que creadores, jugadores y profesionales superen los límites de lo posible.
					</p>
					<p class="font-body-md text-body-md text-outline">
						Cada pieza de hardware en nuestro catálogo es seleccionada por su excelencia técnica y su capacidad para integrarse en un ecosistema de pura potencia.
					</p>
				</div>

				<div class="md:col-span-5 bg-primary-container/10 border border-primary/20 rounded-xl p-stack-lg flex flex-col items-center justify-center text-center">
					<div class="text-[64px] font-bold text-primary mb-2">99.9%</div>
					<div class="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Pure Performance</div>
				</div>

				<div class="md:col-span-5 glass-panel p-stack-lg rounded-xl relative overflow-hidden h-100">
					<div class="relative z-10 h-full flex flex-col justify-end">
						<div class="flex items-center gap-stack-sm mb-stack-md text-primary">
							<span class="material-symbols-outlined text-4xl">visibility</span>
							<h2 class="font-headline-lg text-headline-lg">Visión</h2>
						</div>
						<p class="font-body-md text-body-md text-on-surface-variant">
							Aspiramos a ser el nodo central de la cultura tech global, donde la elegancia del diseño y la brutalidad del rendimiento coexistan en perfecta armonía.
						</p>
					</div>
				</div>

				<div class="md:col-span-7 glass-panel p-stack-lg rounded-xl">
					<h2 class="font-headline-lg text-headline-lg mb-stack-lg">Valores Nucleares</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-stack-lg">
						<div class="space-y-stack-sm">
							<div class="flex items-center gap-2 text-primary">
								<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">bolt</span>
								<h3 class="font-label-md text-label-md font-bold">Velocidad Extrema</h3>
							</div>
							<p class="text-on-surface-variant/70 text-sm">Optimizamos cada proceso para que el flujo de trabajo nunca se detenga.</p>
						</div>
						<div class="space-y-stack-sm">
							<div class="flex items-center gap-2 text-primary">
								<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">shield</span>
								<h3 class="font-label-md text-label-md font-bold">Fiabilidad de Élite</h3>
							</div>
							<p class="text-on-surface-variant/70 text-sm">Soporte técnico real para problemas reales, 24/7 en nuestro hub.</p>
						</div>
						<div class="space-y-stack-sm">
							<div class="flex items-center gap-2 text-primary">
								<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">palette</span>
								<h3 class="font-label-md text-label-md font-bold">Diseño Inmersivo</h3>
							</div>
							<p class="text-on-surface-variant/70 text-sm">La estética no es un extra; es parte fundamental del rendimiento.</p>
						</div>
						<div class="space-y-stack-sm">
							<div class="flex items-center gap-2 text-primary">
								<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">terminal</span>
								<h3 class="font-label-md text-label-md font-bold">Código Abierto</h3>
							</div>
							<p class="text-on-surface-variant/70 text-sm">Creemos en la libertad de modificar y potenciar tu propio hardware.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="py-section-gap bg-surface-container-lowest/50">
		<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
			<h2 class="font-headline-lg text-headline-lg mb-section-gap">El Núcleo del Equipo</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
				{#each team as member}
					<div class="flex flex-col items-center">
						<div class="w-48 h-48 rounded-full border-2 border-primary/30 p-2 mb-stack-md group">
							<div class="w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
								<img class="w-full h-full object-cover" alt="Portrait of {member.name}" src={member.img}/>
							</div>
						</div>
						<h4 class="font-headline-lg-mobile text-headline-lg-mobile">{member.name}</h4>
						<p class="text-primary font-label-md text-label-md">{member.role}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-section-gap px-margin-mobile">
		<div class="max-w-4xl mx-auto glass-panel p-12 rounded-3xl text-center border-primary/30 relative overflow-hidden">
			<div class="relative z-10">
				<h2 class="font-headline-xl text-headline-xl mb-stack-md">¿Listo para el siguiente nivel?</h2>
				<p class="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">Únete a la élite tecnológica y redefine tu experiencia digital.</p>
				<a href="/store" class="inline-block bg-primary text-on-primary px-10 py-4 rounded-full font-bold hover:shadow-[0_0_30px_rgba(221,183,255,0.6)] transition-all duration-300 active:scale-95">
					Explorar Catálogo
				</a>
			</div>
		</div>
	</section>
</main>
