// src/lib/db/productos.ts

export interface Producto {
    id: string;
    nombre: string;
    marca: string;
    precio: number;
    categoria: string;    // Filtro principal (coincide con el query param)
    subcategoria: string; // Subcarpeta física
    img: string;          // Ruta estática local
    descripcion: string;
    stock: number;
}

export const dbProductos: Producto[] = [
    {
        id: "laptop-gamer-01",
        nombre: "Laptop Gamer de Alto Rendimiento",
        marca: "Generic Gaming",
        precio: 1299,
        categoria: "computacion",
        subcategoria: "laptops",
        img: "/productos/computacion/laptops/laptop-gamer.jpg",
        descripcion: "Potencia portátil para gaming y desarrollo exigente.",
        stock: 8
    },
    {
        id: "pc-gamer-01",
        nombre: "PC Desktop Custom Build",
        marca: "Custom",
        precio: 1850,
        categoria: "computacion",
        subcategoria: "pc",
        img: "/productos/computacion/pc/pc-gamer.jpg",
        descripcion: "Estación de escritorio optimizada para FPS estables y máximo enfriamiento.",
        stock: 4
    },
    {
        id: "mouse-razer-01",
        nombre: "Mouse Razer Gaming E-Sports",
        marca: "Razer",
        precio: 75,
        categoria: "perifericos",
        subcategoria: "mouse",
        img: "/productos/perifericos/mouse/mouse-razer.jpg",
        descripcion: "Sensor óptico de alta precisión y peso ultraligero.",
        stock: 14
    },
    {
        id: "teclado-razer-01",
        nombre: "Teclado Razer Mecánico RGB",
        marca: "Razer",
        precio: 110,
        categoria: "perifericos",
        subcategoria: "teclados",
        img: "/productos/perifericos/teclados/teclado-razer.jpg",
        descripcion: "Switches mecánicos táctiles con respuesta inmediata y retroiluminación custom.",
        stock: 12
    },
    {
        id: "router-tplink-01",
        nombre: "Router TP-Link High-Speed",
        marca: "TP-Link",
        precio: 45,
        categoria: "conectividad-y-redes",
        subcategoria: "routers",
        img: "/productos/conectividad-y-redes/routers/router-tp-link.jpg",
        descripcion: "Doble banda con alta cobertura para optimizar el ping de tu setup.",
        stock: 20
    },
    {
        id: "silla-jemip-01",
        nombre: "Silla Gamer Jemip Ergonomic",
        marca: "Jemip",
        precio: 195,
        categoria: "mobiliario",
        subcategoria: "sillas",
        img: "/productos/mobiliario/sillas/silla-jemip.jpg",
        descripcion: "Soporte lumbar avanzado y materiales premium para largas jornadas de juego.",
        stock: 6
    }
];