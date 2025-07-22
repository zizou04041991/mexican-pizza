import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from '@ngrx/signals';
import { computed } from '@angular/core';
import { Client } from '../features/form-send-data-client/interfaces/client';

export interface Pizza {
  id: number;
  name: string;
  ingredients: string;
  price: number;
}

export interface PizzaCartItem extends Pizza {
  count: number;
}

interface PizzaState {
  cart: PizzaCartItem[];
  client: Client;
}

const initialState: PizzaState = {
  cart: [],
  client: {
    name: '',
    lastName: '',
    email: '',
    movil: '',
    address: '',
    dni: '',
  },
};

export const PizzaStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ cart, client }) => ({
    totalItems: computed(() => cart().reduce((sum, item) => sum + item.count, 0)),
    totalPrice: computed(() => cart().reduce((sum, item) => sum + (item.price * item.count), 0)),
    getCart: computed(() => cart()),
    getClient: computed(() => client()),
  })),

  withMethods((store) => ({
    addToCart(pizza: Pizza) {
      const currentCart = store.cart();
      const existingIndex = currentCart.findIndex((p) => p.id === pizza.id);

      if (existingIndex > -1) {
        const updatedCart = [...currentCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          count: updatedCart[existingIndex].count + 1
        };
        patchState(store, { cart: updatedCart });
      } else {
        patchState(store, { 
          cart: [...currentCart, { ...pizza, count: 1 }] 
        });
      }
    },

    updateCartItem(id: number, changes: Partial<PizzaCartItem>) {
      const currentCart = store.cart();
      const itemIndex = currentCart.findIndex((p) => p.id === id);

      if (itemIndex > -1) {
        const updatedCart = [...currentCart];
        updatedCart[itemIndex] = { 
          ...updatedCart[itemIndex], 
          ...changes 
        };
        patchState(store, { cart: updatedCart });
      }
    },

    removeFromCart(id: number) {
      patchState(store, {
        cart: store.cart().filter((p) => p.id !== id),
      });
    },

    updateClient(client: Partial<Client>) {
      patchState(store, {
        client: { ...store.client(), ...client },
      });
    },

    clearCart() {
      patchState(store, { cart: [] });
    },
  }))
);