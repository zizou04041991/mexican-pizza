import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PizzaStore } from '../../store/store';
import { PizzaCartItem } from '../../store/store';
import { DecimalPipe } from '@angular/common';
import { FormSendDataClient } from '../form-send-data-client/form-send-data-client';
import { ModalServices } from '../../shared/services/modal-services';
import { Client } from '../form-send-data-client/interfaces/client';
import { ToastrService } from 'ngx-toastr';
import {
  GenericTable,
  TableAction,
  TableColumn,
} from '../../shared/components/generic-table/generic-table';

@Component({
  selector: 'app-request-pizza',
  standalone: true,
  imports: [FormsModule, DecimalPipe, GenericTable],
  templateUrl: './request-pizza.html',
  styleUrl: './request-pizza.scss',
  providers: [ToastrService],
})
export class RequestPizza {
  store = inject(PizzaStore);
  toastr: ToastrService = inject(ToastrService);
  modalServices: ModalServices = inject(ModalServices);

  readonly isCartEmpty = computed(() => this.store.getCart().length === 0);

  // Señales para paginación
  currentPage = signal(1);
  pageSize = signal(5);
  pageSizeOptions = [5, 10, 20];
  dataModalAccept: Client | undefined = undefined;

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
  cartItemsWithSubtotal = computed(() =>
    this.cartItems().map((item) => ({
      ...item,
      subtotal: item.price * item.count,
    }))
  );
  // Configuración de columnas para la tabla genérica
  columns: TableColumn[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'ingredients', label: 'Ingredientes' },
    { key: 'price', label: 'Precio', type: 'currency', align: 'right' },
    { key: 'count', label: 'Cantidad', align: 'center' },
    {
      key: 'subtotal',
      label: 'Subtotal',
      type: 'currency',
      align: 'right',
      clickable: true,
    },
    { key: 'status', label: 'Estado', align: 'right' },
  ];

  // Acciones para la tabla genérica
actions: TableAction[] = [
  { 
    action: 'decrement', 
    icon: 'fas fa-minus', 
    color: 'orange',
    class: 'bg-orange-500 hover:bg-orange-600' 
  },
  { 
    action: 'increment', 
    icon: 'fas fa-plus', 
    color: 'green',
    class: 'bg-green-500 hover:bg-green-600' 
  },
  { 
    action: 'remove', 
    icon: 'fas fa-trash', 
    color: 'red',
    class: 'bg-red-500 hover:bg-red-600' 
  }
];

  // Métodos para manejar eventos
  handleAction(event: { action: string; item: any }): void {
    switch (event.action) {
      case 'decrement':
        this.decrementQuantity(event.item);
        break;
      case 'increment':
        this.incrementQuantity(event.item);
        break;
      case 'remove':
        this.removeItem(event.item.id);
        break;
    }
  }

  handleCellClick(event: { column: string; item: any }): void {
    console.log('Celda clickeada:', event.column, event.item);
    // Aquí puedes manejar el click en celdas específicas
    if (event.column === 'subtotal') {
      // Lógica para manejar click en subtotal
    }
  }

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

  async pay() {

    if (this.cartItems().length > 0) {
      try {
        this.dataModalAccept = await this.modalServices.open(
          FormSendDataClient,
          {},
          {
            title: 'Datos Personales',
            width: '600px',
            maxHeight: '80vh',
          }
        );

        if (this.dataModalAccept) {
          this.toastr.success(`Orden completada por $${this.totalPrice().toFixed(2)}`, 'Éxito');
          this.store.clearCart();
        }
      } catch (error) {}
    }
  }
}
