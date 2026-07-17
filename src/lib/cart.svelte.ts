// src/lib/cart.svelte.ts

export interface CartItem {
    id: string | number;
    title: string;       
    price: number;       // Precio base en USD (numérico)
    img: string;
    cantidad: number;
}

class CartStore {
    // Lista de productos en el carrito
    items: CartItem[] = $state([]);

    // Estado reactivo global para almacenar la tasa del BCV
    tasaBCV: number = $state(0);

    constructor() {
        // Ejecutamos la consulta de la tasa automáticamente en cuanto se instancia el store
        this.actualizarTasa();
    }

    // Método asíncrono para consumir la tasa oficial en tiempo real
    async actualizarTasa() {
        try {
            const respuesta = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
            if (respuesta.ok) {
                const datos = await respuesta.json();
                this.tasaBCV = datos.promedio;
            }
        } catch (error) {
            console.error('Error obteniendo la tasa oficial en el carrito:', error);
            this.tasaBCV = 45.50; // Tasa de respaldo por seguridad
        }
    }

    // --- GETTERS REACTIVOS DE SVELTE 5 ---
    
    get totalItems() {
        return this.items.reduce((total, item) => total + item.cantidad, 0);
    }

    // Total acumulado en Dólares (USD)
    get totalPrecio() {
        return this.items.reduce((total, item) => total + (item.price * item.cantidad), 0);
    }

    // Total acumulado automáticamente convertido a Bolívares (Bs)
    get totalPrecioBs() {
        return this.totalPrecio * this.tasaBCV;
    }

    // --- MÉTODOS DE ACCIÓN ---

    agregar(producto: Omit<CartItem, 'cantidad'> & { cantidad?: number }) {
        const itemExistente = this.items.find(item => item.id === producto.id);

        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            this.items.push({
                id: producto.id,
                title: producto.title,
                price: producto.price,
                img: producto.img,
                cantidad: 1
            });
        }
    }

    eliminar(id: string | number) {
        const itemExistente = this.items.find(item => item.id === id);

        if (itemExistente) {
            if (itemExistente.cantidad > 1) {
                itemExistente.cantidad -= 1;
            } else {
                this.items = this.items.filter(item => item.id !== id);
            }
        }
    }

    limpiar() {
        this.items = [];
    }
}

// Exportamos una única instancia global del carrito
export const cart = new CartStore();