import { Routes } from '@angular/router';

export const demarcheRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-demarche/main-demarche.component').then(m => m.MainDemarcheComponent)
  }
];
