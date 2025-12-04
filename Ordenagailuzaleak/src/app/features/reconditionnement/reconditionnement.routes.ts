import { Routes } from '@angular/router';

export const reconditionnementRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-reconditionnement/main-reconditionnement.component').then(m => m.MainReconditionnementComponent)
  }
];
