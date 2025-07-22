import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { PizzaStore } from '../../store/store';
import { Router } from '@angular/router';
import { ROUTES } from '../constanst/routes';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  store = inject(PizzaStore);
  router = inject(Router);
  //countPizzasSelect = computed(() => this.store.totalItems());
  goTo(path: string) {
    if (path === 'home') this.router.navigateByUrl(ROUTES.EMPTY);
    if (path === 'profile') this.router.navigateByUrl(ROUTES.PROFILE);
    if (path === 'request') this.router.navigateByUrl(ROUTES.REQUEST);
  }
}
