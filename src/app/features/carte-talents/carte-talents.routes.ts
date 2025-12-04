import { Routes } from '@angular/router';

export const carteTalentsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-carte-talents/main-carte-talents.component').then(m => m.MainCarteTalentsComponent)
  }
];
