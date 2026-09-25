import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalogo',
    pathMatch: 'full'
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./features/catalog/catalog-page.component')
      .then(m => m.CatalogPageComponent)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () => import('./features/checkout/checkout.component')
      .then(m => m.CheckoutPageComponent)
  },
  {
    path: 'mis-pedidos',
    canActivate: [authGuard],
    loadComponent: () => import('./features/orders/my-orders.component')
      .then(m => m.MyOrdersComponent)
  },
  {
    path: '**',
    redirectTo: 'catalogo'
  }
];
