import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PizzaStore } from '../../store/store';
import { PizzaCartItem } from '../../store/store';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-request-pizza',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './request-pizza.html',
  styleUrl: './request-pizza.scss',
})
export class RequestPizza {
  store = inject(PizzaStore);
  readonly isCartEmpty = computed(() => this.store.getCart().length === 0);
  
  // Señales para paginación
  currentPage = signal(1);
  pageSize = signal(5);
  pageSizeOptions = [5, 10, 20];

  // Computed properties
  cartItems = computed(() => this.store.getCart());
  totalPrice = computed(() => this.store.totalPrice());
  
  paginatedItems = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    return this.cartItems().slice(startIndex, startIndex + this.pageSize());
  });

  totalPages = computed(() => 
    Math.ceil(this.cartItems().length / this.pageSize())
  );

  // Métodos
  incrementQuantity(item: PizzaCartItem) {
    this.store.updateCartItem(item.id, { count: item.count + 1 });
  }

  decrementQuantity(item: PizzaCartItem) {
    if (item.count > 1) {
      this.store.updateCartItem(item.id, { count: item.count - 1 });
    } else {
      this.removeItem(item.id);
    }
  }

  removeItem(id: number) {
    this.store.removeFromCart(id);
    
    // Ajustar página si es necesario
    if (this.paginatedItems().length === 0 && this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  changePage(page: number) {
    this.currentPage.set(page);
  }

  changePageSize(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }

  pay() {
    if (this.cartItems().length > 0) {
      alert(`Orden completada por $${this.totalPrice().toFixed(2)}`);
      this.store.clearCart();
    }
  }
}