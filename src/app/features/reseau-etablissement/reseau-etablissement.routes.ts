import { Routes } from '@angular/router';

export const reseauEtablissementRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-reseau-etablissement/main-reseau-etablissement.component').then(m => m.MainReseauEtablissementComponent)
  }
];
