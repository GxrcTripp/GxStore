<script lang="ts">
	import { onMount } from 'svelte';

	const team = [
		{ name: 'Alex Void', role: 'Chief Architect', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX9iSajrX1ye8QAhpErh6fcDjd_ujxfgaJVg6IlrOyGUOfnqJEUzmY3gKewlfE2nJoHBcu2wtgRaPRbi_X2XDYPf9Cle3wweFun6xevQ4kPtLUOgKuKZ9C08MUV5rn36pQn1ubQVroLkqgOKMWL4z0pQlsa9Jk2i-bHXR4pi4hn2EYfAS3ISTpa9Kg1DDF28512RBbPpEDwAuSJqszCKg65h6LKkD9kQAwWPNcouBRz606CBK96XbFIxCUupPj8o8OQ0xrz-Y8jZQ' },
		{ name: 'Luna Cyber', role: 'Creative Director', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUiaNDErJdnxlfCSX7uZqbJPlGG2IMVFhIuleb9CyF6HaLp-z7zOH3EEQvNhKdtOTdcG4mYmGZ7J88G1sGIGnoajc-OjgDdsrejKWd5YoNqcaXTYkw9cezAoY0bXu7cbEWOqmERQFVLrDf0zUhzenlGrP8usCAtr4Fjeib6TYdPsDccucTstet-RyfdUKoHUMiR-Kq1NbCAyS1MO-_HqaNWYlFDEI8cv5AEcDQ2GQDpwKn_ku6HDw2pMOjk7orZfKPy49wARMTiuk' },
		{ name: 'Marcus Volt', role: 'Systems Lead', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdnxpG7J01kMtET19qnMz36XCFaltQsRAl87zxIJQYiWGR98KQOXQmT88piSSFfD-47jaNVb0N9hxvzXNMWxdUiO-C1YmAnT0kVz7-b0Z350XRAqKwi-tkfrffYk3jA-J5qm9A9op1J5TcZRxgTO-36OB7ikqZIPwvU_U8SpcFYw5zv7vvQHuH-nbyDGmRrgh4sj3fd6uwSq-HQ7IJlLXTo83RLHAwhC2orrX7Nce9qKbZalADxJ2vVd0k-Lk0NMuqIgD6wHaDfvY' }
	];

	// --- LOGICA DE ANIMACIÓN PARALAJE SUAVE (LERP) ---
	let mouseX = $state(0);
	let mouseY = $state(0);
	let targetX = 0;
	let targetY = 0;
	let animated = false;

	function updateCoordinates() {
		mouseX += (targetX - mouseX) * 0.1;
		mouseY += (targetY - mouseY) * 0.05;

		if (Math.abs(targetX - mouseX) < 0.01 && Math.abs(targetY - mouseY) < 0.01) {
			mouseX = targetX;
			mouseY = targetY;
			animated = false;
		} else {
			requestAnimationFrame(updateCoordinates);
		}
	}

	function handleMouseMove(e: MouseEvent) {
		targetX = (e.clientX / window.innerWidth) - 0.5;
		targetY = (e.clientY / window.innerHeight) - 0.5;

		if (!animated) {
			animated = true;
			requestAnimationFrame(updateCoordinates);
		}
	}
</script>

<style>
	.glass-panel {
		background: rgba(30, 11, 54, 0.4);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(221, 183, 255, 0.1);
		transition: border-color 0.5s ease, box-shadow 0.5s ease, transform 0.1s ease-out;
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

<svelte:window onmousemove={handleMouseMove} />

<main class="relative bg-background text-on-background min-h-screen pt-20 overflow-x-hidden selection:bg-primary/30 selection:text-primary">
	<div class="ambient-glow top-[10%] left-[-10%]"></div>
	<div class="ambient-glow top-[60%] right-[-5%]"></div>

	<!-- HERO SECTION -->
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
		<div class="mt-section-gap w-full max-w-5xl h-100 md:h-150 rounded-xl overflow-hidden glass-panel relative group shadow-2xl" style="transform: perspective(1000px) rotateY({mouseX * 1.5}deg) rotateX({-mouseY * 1.5}deg)">
			<div class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDM7bEv--y7jcAbKr_WQkQ53ADMpjSoH8vL1O53SnVZXm1tcxYR1h1HnuqPxaWtmBgi4jqH_j5fTXOc6wNs1pmnYmOglFxwC3N9z-g443tOGMQe1u-yRZImUaCcg869ng36zeGSEyuTaGkt33SW0xAWxwJvLN5_cyHGTZDvVp6atBQ43xK0FNDBrp3GHVmQJdhB4am2m7Nn5WIOYMt6Zk86WE3qnDPP1qWpEuaIFfOV-wpM0twv9CuA0V8kMYgaAaaZsQgbEsenycE')"></div>
			<div class="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent"></div>
		</div>
	</section>

<!-- SECCIÓN: MISIÓN, VISIÓN Y ESPECIFICACIONES -->
	<section class="py-section-gap px-margin-mobile md:px-margin-desktop">
		<div class="max-w-container-max mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
				
				<!-- Misión de la Tienda -->
				<div class="md:col-span-7 glass-panel p-stack-lg rounded-xl flex flex-col justify-center min-h-100 hover:border-primary/40 transition-all duration-300" style="transform: perspective(1000px) rotateY({mouseX * 2}deg) rotateX({-mouseY * 2}deg)">
					<div class="flex items-center gap-stack-sm mb-stack-md text-primary">
						<div class="flex items-center justify-center">
							<span class="material-symbols-outlined text-4xl">rocket_launch</span>
						</div>
						<h2 class="font-headline-lg text-headline-lg">Misión</h2>
					</div>
					<p class="font-body-lg text-body-lg text-on-surface-variant mb-stack-md">
						En GxStore nos dedicamos a importar y distribuir hardware de alto rendimiento, componentes premium y periféricos de nivel competitivo al mejor precio del mercado local.
					</p>
					<p class="font-body-md text-body-md text-outline">
						Nuestra meta es asegurar que cada entusiasta, gamer y desarrollador tenga acceso al armamento digital exacto para potenciar sus proyectos y partidas diarias.
					</p>
				</div>

				<!-- Contenedor del Logo de la Marca -->
				<div class="md:col-span-5 bg-primary-container/10 border border-primary/20 rounded-xl p-stack-lg flex flex-col items-center justify-center text-center shadow-lg transition-all duration-300 hover:border-primary/40" style="transform: perspective(1000px) rotateY({mouseX * 2}deg) rotateX({-mouseY * 2}deg)">
					<img src="/src/lib/assets/logo.png" alt="Logo oficial de GxStore" class="max-h-48 object-contain"/>
				</div>

				<!-- Visión de la Tienda -->
				<div class="md:col-span-5 glass-panel p-stack-lg rounded-xl relative overflow-hidden h-100 hover:border-primary/40 transition-all duration-300" style="transform: perspective(1000px) rotateY({mouseX * 2.5}deg) rotateX({-mouseY * 2.5}deg)">
					<div class="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 blur-3xl rounded-full"></div>
					<div class="relative z-10 h-full flex flex-col justify-end">
						<div class="flex items-center gap-stack-sm mb-stack-md text-primary">
							<div class="flex items-center justify-center">
								<span class="material-symbols-outlined text-4xl">visibility</span>
							</div>
							<h2 class="font-headline-lg text-headline-lg">Visión</h2>
						</div>
						<p class="font-body-md text-body-md text-on-surface-variant">
							Convertirnos en el hub de hardware de referencia a nivel nacional, reconocidos por la calidad estricta de nuestros componentes, el soporte de optimización avanzado y una comunidad sólida que redefine el rendimiento tecnológico.
						</p>
					</div>
				</div>

				<!-- Especificaciones de Élite (Antiguos Valores Nucleares) -->
				<div class="md:col-span-7 glass-panel p-stack-lg rounded-xl hover:border-primary/40 transition-all duration-300" style="transform: perspective(1000px) rotateY({mouseX * 2}deg) rotateX({-mouseY * 2}deg)">
					<h2 class="font-headline-lg text-headline-lg mb-stack-lg">Especificaciones de Élite</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-stack-lg">
						
						<!-- Componentes Premium -->
						<div class="space-y-stack-sm">
							<div class="flex items-center gap-2 text-primary">
								<div class="flex items-center justify-center">
									<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">memory</span>
								</div>
								<h3 class="font-label-md text-label-md font-bold">Hardware de Vanguardia</h3>
							</div>
							<p class="text-on-surface-variant/70 text-sm">Desde tarjetas gráficas optimizadas hasta periféricos de alta tasa de sondeo para juego competitivo.</p>
						</div>

						<!-- Optimización Extrema -->
						<div class="space-y-stack-sm">
							<div class="flex items-center gap-2 text-primary">
								<div class="flex items-center justify-center">
									<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">thermostat</span>
								</div>
								<h3 class="font-label-md text-label-md font-bold">Cero Cuellos de Botella</h3>
							</div>
							<p class="text-on-surface-variant/70 text-sm">Probamos y monitoreamos las temperaturas y métricas de rendimiento para asegurar estabilidad máxima.</p>
						</div>

						<!-- Soporte Técnico Especializado -->
						<div class="space-y-stack-sm">
							<div class="flex items-center gap-2 text-primary">
								<div class="flex items-center justify-center">
									<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">build</span>
								</div>
								<h3 class="font-label-md text-label-md font-bold">Ensamblaje Profesional</h3>
							</div>
							<p class="text-on-surface-variant/70 text-sm">Asesoramiento real en overclocking, gestión de cableado y compatibilidad estricta de componentes.</p>
						</div>

						<!-- Garantía Real -->
						<div class="space-y-stack-sm">
							<div class="flex items-center gap-2 text-primary">
								<div class="flex items-center justify-center">
									<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">verified</span>
								</div>
								<h3 class="font-label-md text-label-md font-bold">Fiabilidad de Stock</h3>
							</div>
							<p class="text-on-surface-variant/70 text-sm">Productos 100% originales con soporte técnico directo y local listo para resolver problemas reales.</p>
						</div>

					</div>
				</div>
			</div>
		</div>
	</section>

<!-- SECCIÓN: EL NÚCLEO DEL EQUIPO -->
	<section class="py-section-gap bg-surface-container-lowest/10 relative">
		<div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
			<h2 class="font-headline-lg text-headline-lg mb-section-gap neon-text-glow">El Núcleo del Equipo</h2>
			
			<!-- Contenedor flex para centrar un único miembro en la pantalla -->
			<div class="flex justify-center">
				<div class="flex flex-col items-center max-w-sm p-6 rounded-2xl border border-transparent hover:bg-white/2 hover:border-white/5 transition-all duration-500" style="transform: perspective(1000px) rotateY({mouseX * 3}deg) rotateX({-mouseY * 3}deg)">
					
					<!-- Contenedor de la foto de perfil -->
					<div class="w-48 h-48 rounded-full border-2 border-primary/30 p-2 mb-stack-md group">
						<div class="w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 shadow-[0_0_15px_rgba(221,183,255,0.1)] group-hover:shadow-[0_0_25px_rgba(221,183,255,0.4)]">
							<img class="w-full h-full object-cover" alt="Retrato de Alex Void" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX9iSajrX1ye8QAhpErh6fcDjd_ujxfgaJVg6IlrOyGUOfnqJEUzmY3gKewlfE2nJoHBcu2wtgRaPRbi_X2XDYPf9Cle3wweFun6xevQ4kPtLUOgKuKZ9C08MUV5rn36pQn1ubQVroLkqgOKMWL4z0pQlsa9Jk2i-bHXR4pi4hn2EYfAS3ISTpa9Kg1DDF28512RBbPpEDwAuSJqszCKg65h6LKkD9kQAwWPNcouBRz606CBK96XbFIxCUupPj8o8OQ0xrz-Y8jZQ"/>
						</div>
					</div>
					
					<!-- Información del Miembro -->
					<h4 class="font-headline-lg-mobile text-headline-lg-mobile hover:text-primary transition-colors duration-300">Alex Void</h4>
					<p class="text-on-surface-variant/80 font-label-md text-label-md mt-1">Arquitecto Principal de Sistemas</p>
				</div>
			</div>

		</div>
	</section>
</main>