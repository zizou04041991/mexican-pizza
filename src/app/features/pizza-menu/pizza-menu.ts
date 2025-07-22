import {
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { PizzaCard } from '../../shared/pizza-card/pizza-card';
import { ARRAY_PIZZAS } from '../../shared/constants/pizzas';
import { PizzaStore, PizzaCartItem } from '../../store/store';

@Component({
  selector: 'app-pizza-menu',
  standalone: true,
  imports: [PizzaCard],
  templateUrl: './pizza-menu.html',
  styleUrl: './pizza-menu.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaMenu {
  // Señal con las pizzas disponibles
  readonly pizzas = signal(ARRAY_PIZZAS);
  
  // Inyectar el store
  private readonly store = inject(PizzaStore);
  
  // Computar los items del carrito
  readonly cartItems = computed(() => this.store.getCart());

  updateCart(pizza: PizzaCartItem) {
  if (pizza.count > 0) {
    // Actualiza el item existente o añade uno nuevo
    const existingItem = this.store.getCart().find(p => p.id === pizza.id);
    if (existingItem) {
      this.store.updateCartItem(pizza.id, { count: pizza.count });
    } else {
      this.store.addToCart(pizza);
    }
  } else {
    this.store.removeFromCart(pizza.id);
  }
}

  // Obtener cantidad de un item específico en el carrito
  getQuantity(id: number): number {
    const item = this.cartItems().find(p => p.id === id);
    return item ? item.count : 0;
  }
}