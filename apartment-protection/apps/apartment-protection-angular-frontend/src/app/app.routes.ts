import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];
