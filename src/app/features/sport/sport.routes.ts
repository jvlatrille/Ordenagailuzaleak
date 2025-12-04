import { Routes } from '@angular/router';

export const sportRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-sport/main-sport.component').then(m => m.MainSportComponent)
  }
];
