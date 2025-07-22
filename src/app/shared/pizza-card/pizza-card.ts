import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { PizzaCartItem } from '../../store/store';

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  templateUrl: './pizza-card.html',
  styleUrl: './pizza-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaCard {
  // Inputs requeridos
  @Input({ required: true }) id!: number;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) price!: number;
  @Input({ required: true }) urlImage!: string;
  @Input({ required: true }) ingredients!: string;
  
  // Input para la cantidad inicial con valor por defecto 0
  @Input() quantityInitial = 0;

  // Output para emitir cambios
  @Output() addToCart = new EventEmitter<PizzaCartItem>();

  // Señal para manejar la cantidad reactivamente
  quantity = signal(0);
  readonly MAX_CART = 1000000;

  // Actualizar la señal cuando cambia quantityInitial
  ngOnChanges() {
    this.quantity.set(this.quantityInitial);
  }

  // Método para incrementar cantidad
  increment() {
    if (this.quantity() < this.MAX_CART) {
      this.quantity.update(q => q + 1);
      this.emitCartItem();
    }
  }

  // Método para decrementar cantidad
  decrement() {
    if (this.quantity() > 0) {
      this.quantity.update(q => q - 1);
      this.emitCartItem();
    }
  }

  // Emitir el item actualizado
  private emitCartItem() {
    this.addToCart.emit({
      id: this.id,
      name: this.name,
      ingredients: this.ingredients,
      price: this.price,
      count: this.quantity(),
    });
  }
}
