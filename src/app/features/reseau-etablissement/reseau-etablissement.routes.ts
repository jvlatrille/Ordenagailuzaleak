import { Routes } from '@angular/router';

export const reseauEtablissementRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./reseau-presentation/reseau-presentation.component').then(m => m.ReseauPresentationComponent)
  },
  {
    path: 'forum',
    loadComponent: () => import('./main-reseau-etablissement/main-reseau-etablissement.component').then(m => m.MainReseauEtablissementComponent)
  }
];