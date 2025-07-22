import { Routes } from '@angular/router';
import { ROUTES } from './core/constanst/routes';

export const routes: Routes = [
  {
    path: ROUTES.LOGIN,
    loadComponent: () =>
      import('./authentication/login/login').then((m) => m.Login),
  },
  {
    path: ROUTES.EMPTY,
    loadComponent: () => import('./core/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: ROUTES.EMPTY,
        loadComponent: () =>
          import('./features/pizza-menu/pizza-menu').then((m) => m.PizzaMenu),
      },
      {
        path: ROUTES.REQUEST,
        loadComponent: () =>
          import('./features/request-pizza/request-pizza').then(
            (m) => m.RequestPizza
          ),
      },
    ],
  },
  {
    path: ROUTES.ANYTHING,
    redirectTo: ROUTES.EMPTY,
    pathMatch: 'full',
  },
];
