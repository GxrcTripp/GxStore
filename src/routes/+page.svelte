<script lang="ts">
    import { onMount } from 'svelte';

    // 1. Constante de imágenes limpia (solo tus archivos locales reales)
    const images = {
        pcGamer: '/productos/computacion/pc/pc-gamer.jpg',
        laptopGamer: '/productos/computacion/laptops/laptop-gamer.jpg',
        mouseRazer: '/productos/perifericos/mouse/mouse-razer.jpg',
        tecladoRazer: '/productos/perifericos/teclados/teclado-razer.jpg',
        routerTPLink: '/productos/conectividad-y-redes/routers/router-tp-link.jpg',
        sillaJemip: '/productos/mobiliario/sillas/silla-jemip.jpg'
    };

    // 2. Categorías actualizadas con sus respectivas imágenes locales de fondo
    const categorias = [
        { 
            id: 1, 
            titulo: "Computación", 
            url: "/store?category=computacion",
            img: images.laptopGamer // Usa la laptop como fondo
        },
        { 
            id: 2, 
            titulo: "Periféricos", 
            url: "/store?category=perifericos",
            img: images.tecladoRazer // Usa el teclado como fondo
        },
        { 
            id: 3, 
            titulo: "Conectividad y Redes", 
            url: "/store?category=conectividad-y-redes",
            img: images.routerTPLink // Usa el router como fondo
        },
        { 
            id: 4, 
            titulo: "Mobiliario", 
            url: "/store?category=mobiliario",
            img: images.sillaJemip // Usa la silla como fondo
        }
    ];

    // Lógica para el carrusel de fondo (2 slides)
    let currentSlide = $state(0);
    let interval: any;
    let scrolled = $state(0);

    onMount(() => {
        // Autoplay del fondo promocional cada 6 segundos
        interval = setInterval(() => {
            currentSlide = (currentSlide + 1) % 2;
        }, 6000);

        const handleScroll = () => { scrolled = window.pageYOffset; };
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<style>
    .glass-card {
        background: rgba(30, 11, 54, 0.4);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(221, 183, 255, 0.1);
        transition: all 0.3s ease-out;
    }
</style>

<main class="pt-20 bg-background text-on-background min-h-screen">
    
    <!-- GRAN SECCIÓN CON PANTALLA PROMOCIONAL DE DOS SLIDES DE FONDO -->
    <section class="py-16 px-margin-desktop relative overflow-hidden min-h-150x items-center">
        
        <!-- CAROUSEL DE FONDO (2 Slides usando tus imágenes de computación reales) -->
        <div class="absolute inset-0 z-0 flex transition-transform duration-1000 ease-in-out" style="transform: translateX(-{currentSlide * 100}%);">
            
            <!-- Slide 1: PC Gamer -->
            <div class="min-w-full h-full relative shrink-0">
                <img src={images.pcGamer} alt="Promo Slide 1" class="w-full h-full object-cover opacity-25" />
                <div class="absolute inset-0 bg-linear-to-t from-background via-black/40 to-background"></div>
            </div>

            <!-- Slide 2: Laptop Gamer -->
            <div class="min-w-full h-full relative shrink-0">
                <img src={images.laptopGamer} alt="Promo Slide 2" class="w-full h-full object-cover opacity-25 brightness-90 hue-rotate-15" />
                <div class="absolute inset-0 bg-linear-to-t from-background via-black/40 to-background"></div>
            </div>

        </div>

        <!-- Capas de degradado fijas para suavizar los bordes del carrusel de fondo -->
        <div class="absolute inset-0 z-5 pointer-events-none bg-linear-to-r from-background/90 via-transparent to-background/90"></div>
        <div class="absolute inset-0 z-5 pointer-events-none backdrop-blur-[1px]"></div>

        <!-- CONTENIDO EN PRIMER PLANO -->
        <div class="relative z-10 container mx-auto space-y-12 w-full">
            
            <!-- Indicadores sutiles del estado del fondo (Puntitos) -->
            <div class="flex justify-center gap-2">
                <button aria-label="Slide 1" onclick={() => currentSlide = 0} class="h-1 rounded-full transition-all duration-300 {currentSlide === 0 ? 'w-8 bg-primary' : 'w-2 bg-white/30'}"></button>
                <button aria-label="Slide 2" onclick={() => currentSlide = 1} class="h-1 rounded-full transition-all duration-300 {currentSlide === 1 ? 'w-8 bg-primary' : 'w-2 bg-white/30'}"></button>
            </div>

            <!-- Textos de la promoción principal -->
            <div class="text-center space-y-4 max-w-3xl mx-auto">
                <p class="font-headline-xl text-[36px] md:text-headline-xl text-on-background font-black tracking-tight uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                    NUEVA GENERACIÓN DISPONIBLE
                </p>
                <p class="text-body-lg text-on-surface-variant max-w-xl mx-auto text-center font-medium">
                    Explora nuestro catálogo con la infraestructura más potente del mercado.
                </p>
            </div>

            <!-- Las 4 Tarjetas de Categorías (Cada una con su imagen correspondiente de fondo) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter max-w-6xl mx-auto">
                {#each categorias as cat (cat.id)}
                    <a 
                        href={cat.url} 
                        class="glass-card rounded-2xl p-6 h-48 flex flex-col justify-between group overflow-hidden relative hover:bg-primary/10 hover:border-primary/40 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(183,109,255,0.15)]"
                    >
                        <!-- Imagen de fondo individual usando el producto de su categoría -->
                        <div class="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300">
                            <img src={cat.img} alt={cat.titulo} class="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500" />
                        </div>

                        <!-- Título superior -->
                        <div class="relative z-10">
                            <p class="font-headline-lg text-[18px] text-on-background font-bold tracking-wider group-hover:text-primary transition-colors duration-300">
                                {cat.titulo}
                            </p>
                        </div>

                        <!-- Botón de acción inferior -->
                        <div class="relative z-10 flex items-center gap-2 text-primary font-label-md font-bold translate-y-1 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 transition-all duration-300">
                            <p class="text-xs tracking-widest uppercase">VIEW STORE</p>
                            <div class="material-symbols-outlined text-[16px] transform group-hover:translate-x-1 transition-transform">arrow_forward</div>
                        </div>
                    </a>
                {/each}
            </div>

        </div>
    </section>

    <!-- SECCIÓN DE PRODUCTOS DESTACADOS LOCALES -->
    <section class="py-section-gap px-margin-desktop bg-surface-container-lowest relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
        
        <!-- Encabezado de la Sección -->
        <div class="flex justify-between items-end mb-stack-lg">
            <div>
                <p class="font-headline-lg text-headline-lg text-on-background font-bold uppercase tracking-wide">
                    EQUIPAMIENTO DESTACADO
                </p>
                <p class="text-on-surface-variant">
                    Hardware seleccionado de alta gama listo para potenciar tu setup.
                </p>
            </div>
            <a class="text-primary font-label-md flex items-center gap-1 hover:underline" href="/store">
                VER TIENDA
                <div class="material-symbols-outlined text-[18px]">arrow_forward</div>
            </a>
        </div>

        <!-- Bento Grid de Productos Destacados -->
        <div class="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-gutter h-200">
            
            <!-- TARJETA GRANDE: PC Desktop Custom Build (Doble Espacio) -->
            <div class="md:col-span-2 md:row-span-2 glass-card rounded-xl p-8 flex flex-col justify-between group overflow-hidden relative" style="transform: translateY({scrolled * 0.05}px)">
                <div class="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-700" style="background-image: url('{images.pcGamer}')"></div>
                
                <div class="relative z-10">
                    <p class="bg-primary text-on-primary text-[10px] font-bold px-2 py-1 rounded inline-block tracking-wider">
                        PRE-BUILT RIG
                    </p>
                    <p class="font-headline-lg text-headline-lg mt-4 font-black tracking-tight text-on-background">
                        PC DESKTOP CUSTOM BUILD
                    </p>
                    <p class="text-on-surface-variant max-w-xs mt-2 text-body-md">
                        Estación de escritorio optimizada para FPS estables y máximo enfriamiento.
                    </p>
                </div>
                
                <div class="relative z-10 flex justify-between items-center">
                    <p class="font-headline-lg text-primary font-black text-2xl">
                        $1,850
                    </p>
                    <button aria-label="Agregar PC Desktop al carrito" class="bg-primary text-on-primary p-3 rounded-full hover:rotate-90 transition-transform shadow-lg shadow-primary/20">
                        <div class="material-symbols-outlined flex items-center justify-center">add</div>
                    </button>
                </div>
            </div>

            <!-- TARJETA HORIZONTAL: Laptop Gamer -->
            <div class="md:col-span-2 glass-card rounded-xl p-6 flex items-center gap-gutter relative overflow-hidden z-10" style="transform: translateY({scrolled * 0.05}px)">
                <div class="flex-1 z-10">
                    <p class="bg-secondary/20 text-secondary text-[9px] font-bold px-2 py-0.5 rounded inline-block mb-2 tracking-wider">
                        PORTABILIDAD PRO
                    </p>
                    <p class="font-headline-lg text-headline-lg-mobile font-bold text-on-background">
                        LAPTOP GAMER HIGH-TIER
                    </p>
                    <p class="text-on-surface-variant text-body-md mt-1">
                        Potencia portátil para gaming y desarrollo exigente allá donde vayas.
                    </p>
                    <p class="font-headline-md text-primary font-black text-xl mt-3">
                        $1,299
                    </p>
                </div>
                <div class="w-1/2 h-full relative z-5 flex items-center justify-center">
                    <img class="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500" alt="Laptop Gamer" src={images.laptopGamer}/>
                </div>
            </div>

            <!-- TARJETA INFERIOR 1: Teclado Razer -->
            <div class="glass-card rounded-xl p-6 flex flex-col justify-between hover:bg-primary/5 hover:border-primary/30 transition-all group z-5" style="transform: translateY({scrolled * 0.05}px)">
                <div class="h-52 w-full overflow-hidden rounded-lg relative bg-black/10 p-4 flex items-center justify-center">
                    <img class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" alt="Teclado Razer" src={images.tecladoRazer}/>
                </div>
                <div class="mt-4">
                    <p class="font-bold text-on-surface text-sm uppercase tracking-wide group-hover:text-primary transition-colors">TECLADO RAZER MECÁNICO</p>
                    <div class="flex justify-between items-center mt-1">
                        <p class="text-label-md text-primary font-black text-lg">$110</p>
                        <p class="text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded">STOCK</p>
                    </div>
                </div>
            </div>
            
            <!-- TARJETA INFERIOR 2: Mouse Razer -->
            <div class="glass-card rounded-xl p-6 flex flex-col justify-between hover:bg-primary/5 hover:border-primary/30 transition-all group z-5" style="transform: translateY({scrolled * 0.05}px)">
                <div class="h-52 w-full overflow-hidden rounded-lg relative bg-black/10 p-4 flex items-center justify-center">
                    <img class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" alt="Mouse Razer" src={images.mouseRazer}/>
                </div>
                <div class="mt-4">
                    <p class="font-bold text-on-surface text-sm uppercase tracking-wide group-hover:text-primary transition-colors">MOUSE RAZER E-SPORTS</p>
                    <div class="flex justify-between items-center mt-1">
                        <p class="text-label-md text-primary font-black text-lg">$75</p>
                        <p class="text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded">STOCK</p>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-section-gap px-margin-desktop">
        <div class="glass-card rounded-2xl p-12 relative overflow-hidden flex flex-col items-center text-center gap-stack-lg border border-primary/20">
            <div class="absolute inset-0 bg-primary/5 pointer-events-none"></div>
            <div class="relative z-10 max-w-2xl">
                <p class="font-headline-xl text-headline-xl mb-4 font-bold">JOIN THE CORE</p>
                <p class="text-body-lg text-on-surface-variant">Get early access to limited edition drops, firmware updates, and community tournaments.</p>
            </div>
            <div class="relative z-10 flex w-full max-w-md bg-surface-container-low border border-outline-variant/30 rounded-lg p-1">
                <input class="flex-1 bg-transparent border-none focus:ring-0 px-4 py-3 text-on-surface placeholder:text-outline" placeholder="Enter your neural-link email" type="email"/>
                <button class="bg-primary text-on-primary px-8 py-3 rounded-md font-bold hover:brightness-110 active:scale-95 transition-all">SIGN UP</button>
            </div>
        </div>
    </section>
</main>