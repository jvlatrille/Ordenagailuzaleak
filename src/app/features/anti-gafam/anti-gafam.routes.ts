import { Routes } from '@angular/router';

export const antiGafamRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-anti-gafam/main-anti-gafam.component').then(m => m.MainAntiGafamComponent)
  }
];
