// src/lib/cart.svelte.ts

// 1. Unificamos la interfaz al inglés para que coincida perfectamente con tus componentes
export interface CartItem {
    id: string | number;
    title: string;       // Cambiado de 'nombre' a 'title'
    price: number;       // Cambiado de 'precio' a 'price' (numérico)
    img: string;
    cantidad: number;
}

class CartStore {
    // Definimos explícitamente el tipo de la runa como un array de CartItem
    items: CartItem[] = $state([]);

    // Getters reactivos usando la nueva sintaxis de Svelte 5
    get totalItems() {
        return this.items.reduce((total, item) => total + item.cantidad, 0);
    }

    get totalPrecio() {
        return this.items.reduce((total, item) => total + (item.price * item.cantidad), 0);
    }

    // Tipamos el parámetro 'producto' omitiendo la propiedad cantidad para el ingreso inicial
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

    // Tipamos el parámetro 'id'
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