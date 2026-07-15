<script lang="ts">
    import { onMount } from 'svelte';

    // Estados reactivos para el formulario (Svelte 5 Runes)
    let firstName = $state('');
    let lastName = $state('');
    let email = $state('');
    let phone = $state('');
    let message = $state('');
    let status = $state<'idle' | 'sending' | 'sent'>('idle');

    // Coordenadas aproximadas de Valencia, Carabobo (Zona de Prebo/Av. Universidad)
    const lat = 10.2115;
    const lng = -68.0123;

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

    // --- MANEJO DEL FORMULARIO ---
    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        status = 'sending';

        setTimeout(() => {
            status = 'sent';
            setTimeout(() => {
                status = 'idle';
                firstName = '';
                lastName = '';
                email = '';
                phone = '';
                message = '';
            }, 3000);
        }, 1500);
    }

    // --- INICIALIZAR MAPA ABIERTO CON LEAFLET ---
    onMount(async () => {
        // Importamos Leaflet de forma dinámica en el cliente
const L = await import('leaflet');
        
        // Inicializamos el contenedor del mapa
        const map = L.map('map', {
            center: [lat, lng],
            zoom: 15,
            zoomControl: false,
            attributionControl: false
        });

        // Usamos un mapa base oscuro y estético (CartoDB Dark Matter)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 20
        }).addTo(map);

        // Diseñamos un marcador táctico personalizado con CSS puro
        const customIcon = L.divIcon({
            className: 'custom-gps-marker',
            html: `
                <div class="relative flex items-center justify-center">
                    <span class="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-primary/40 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary border-2 border-background shadow-[0_0_10px_#ddb7ff]"></span>
                </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        L.marker([lat, lng], { icon: customIcon }).addTo(map);
    });
</script>

<svelte:head>
    <!-- Importamos el CSS esencial de Leaflet directamente -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</svelte:head>

<style>
    .glass-panel {
        background: rgba(30, 11, 54, 0.4);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(221, 183, 255, 0.1);
        transition: border-color 0.5s ease, box-shadow 0.5s ease;
    }
    .neon-glow {
        box-shadow: 0 0 15px rgba(221, 183, 255, 0.3);
    }
    .neon-glow:hover {
        box-shadow: 0 0 25px rgba(221, 183, 255, 0.5);
    }
    .contact-input:focus {
        box-shadow: 0 0 0 2px rgba(221, 183, 255, 0.2);
        border-color: #ddb7ff;
    }
    .neon-glow-text {
        text-shadow: 0 0 8px rgba(221, 183, 255, 0.6);
    }
    
    /* Animación del haz de escaneo */
    @keyframes scan {
        0% { top: 0%; opacity: 0.3; }
        50% { opacity: 0.8; }
        100% { top: 100%; opacity: 0.3; }
    }
    .animate-scan {
        animation: scan 4s linear infinite;
    }

    /* Para asegurar que los tiles oscuros se acoplen al diseño de nuestra app */
    :global(.leaflet-container) {
        background: #0f0716 !important;
    }
    :global(.leaflet-tile-pane) {
        filter: hue-rotate(270deg) saturate(1.2) brightness(0.9); /* Ajusta los tonos grises de CartoDB a morados/neón */
    }
</style>

<svelte:window onmousemove={handleMouseMove} />

<main class="pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen max-w-container-max mx-auto relative bg-background text-on-background">
    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-section-gap items-center">
        
        <!-- SECCIÓN IZQUIERDA: INFORMACIÓN DE CONTACTO -->
        <div class="flex flex-col gap-stack-lg">
            <div>
                <h1 class="font-headline-xl text-headline-xl text-primary mb-stack-sm neon-glow-text">Ponte en Contacto</h1>
                <p class="text-on-surface-variant font-body-lg max-w-md">
                    ¿Tienes dudas sobre nuestro catálogo de hardware premium? Nuestro equipo técnico está listo para ofrecerte soporte de alto rendimiento.
                </p>
            </div>
            
            <div class="flex flex-col gap-stack-md mt-stack-lg">
                <!-- Tarjeta Dirección -->
                <div class="glass-panel p-stack-md rounded-xl flex items-start gap-stack-md hover:border-primary/40 transition-all duration-300" style="transform: perspective(1000px) rotateY({mouseX * 2.5}deg) rotateX({-mouseY * 2.5}deg)">
                    <div class="bg-primary-container/20 p-3 rounded-lg text-primary">
                        <span class="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                        <h3 class="font-label-md text-primary uppercase tracking-widest font-bold">Dirección</h3>
                        <p class="text-on-surface mt-1">Av. Universidad, C.C. Prebo, Local 12<br/>Valencia, Carabobo, Venezuela</p>
                    </div>
                </div>

                <!-- Tarjeta Teléfono -->
                <div class="glass-panel p-stack-md rounded-xl flex items-start gap-stack-md hover:border-primary/40 transition-all duration-300" style="transform: perspective(1000px) rotateY({mouseX * 2.5}deg) rotateX({-mouseY * 2.5}deg)">
                    <div class="bg-primary-container/20 p-3 rounded-lg text-primary">
                        <span class="material-symbols-outlined">call</span>
                    </div>
                    <div>
                        <h3 class="font-label-md text-primary uppercase tracking-widest font-bold">Teléfono</h3>
                        <p class="text-on-surface mt-1">+58 (412) 555-NEON</p>
                    </div>
                </div>

                <!-- Tarjeta Email -->
                <div class="glass-panel p-stack-md rounded-xl flex items-start gap-stack-md hover:border-primary/40 transition-all duration-300" style="transform: perspective(1000px) rotateY({mouseX * 2.5}deg) rotateX({-mouseY * 2.5}deg)">
                    <div class="bg-primary-container/20 p-3 rounded-lg text-primary">
                        <span class="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                        <h3 class="font-label-md text-primary uppercase tracking-widest font-bold">Email</h3>
                        <p class="text-on-surface mt-1">soporte@neoncore.digital</p>
                    </div>
                </div>
            </div>

            <!-- GPS INTERACTIVO OPEN-SOURCE (Cyberpunk y Gratis) -->
            <div class="mt-stack-lg overflow-hidden rounded-xl border border-primary/20 h-56 relative group shadow-[0_0_15px_rgba(221,183,255,0.05)] hover:border-primary/50 transition-all duration-500">
                <div id="map" class="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                <!-- Capas decorativas de escaneo cyberpunk -->
                <div class="absolute inset-0 pointer-events-none bg-linear-to-t from-[#0F0716] via-transparent to-transparent z-10"></div>
                <div class="absolute inset-x-0 top-0 h-0.5 bg-primary/40 shadow-[0_0_8px_#ddb7ff] animate-scan pointer-events-none z-20"></div>
            </div>
        </div>

        <!-- SECCIÓN DERECHA: FORMULARIO -->
        <div class="glass-panel p-stack-lg rounded-xl border border-primary/10 shadow-2xl relative overflow-hidden" style="transform: perspective(1000px) rotateY({mouseX * 4}deg) rotateX({-mouseY * 4}deg)">
            <div class="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-3xl rounded-full"></div>
            
            <form onsubmit={handleSubmit} class="flex flex-col gap-stack-md relative z-10">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                    <div class="flex flex-col gap-1">
                        <label class="text-label-md text-on-surface-variant ml-1 font-semibold" for="firstName">Nombre</label>
                        <input id="firstName" bind:value={firstName} required class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:ring-0 focus:outline-none focus:border-primary contact-input transition-all" placeholder="Ej. Gustavo" type="text"/>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label class="text-label-md text-on-surface-variant ml-1 font-semibold" for="lastName">Apellido</label>
                        <input id="lastName" bind:value={lastName} required class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:ring-0 focus:outline-none focus:border-primary contact-input transition-all" placeholder="Ej. Ramirez" type="text"/>
                    </div>
                </div>
                
                <div class="flex flex-col gap-1">
                    <label class="text-label-md text-on-surface-variant ml-1 font-semibold" for="email">Correo Electrónico</label>
                    <input id="email" bind:value={email} required class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:ring-0 focus:outline-none focus:border-primary contact-input transition-all" placeholder="ejemplo@correo.com" type="email"/>
                </div>
                
                <div class="flex flex-col gap-1">
                    <label class="text-label-md text-on-surface-variant ml-1 font-semibold" for="phone">Teléfono de Contacto</label>
                    <input id="phone" bind:value={phone} required class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:ring-0 focus:outline-none focus:border-primary contact-input transition-all" placeholder="+58 (412) 000-0000" type="tel"/>
                </div>
                
                <div class="flex flex-col gap-1">
                    <label class="text-label-md text-on-surface-variant ml-1 font-semibold" for="message">Mensaje (Opcional)</label>
                    <textarea id="message" bind:value={message} class="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:ring-0 focus:outline-none focus:border-primary contact-input transition-all resize-none" placeholder="¿Cómo te podemos ayudar hoy?" rows="4"></textarea>
                </div>
                
                <div class="mt-stack-sm">
                    {#if status === 'idle'}
                        <button class="w-full bg-primary text-on-primary font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all neon-glow cursor-pointer" type="submit">
                            <span>Enviar Mensaje</span>
                            <span class="material-symbols-outlined">send</span>
                        </button>
                    {:else if status === 'sending'}
                        <button disabled class="w-full bg-primary text-on-primary font-bold py-4 rounded-lg flex items-center justify-center gap-2 opacity-80 cursor-not-allowed">
                            <span class="material-symbols-outlined animate-spin">progress_activity</span>
                            <span>Enviando...</span>
                        </button>
                    {:else if status === 'sent'}
                        <button disabled class="w-full bg-green-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300">
                            <span class="material-symbols-outlined">check_circle</span>
                            <span>Mensaje Enviado Exitosamente</span>
                        </button>
                    {/if}
                </div>
                
                <p class="text-center text-label-md text-on-surface-variant mt-stack-sm">
                    Al enviar, aceptas nuestra <a class="text-primary hover:underline font-semibold" href="/privacy">Política de Privacidad</a>.
                </p>
            </form>
        </div>
    </div>
</main>