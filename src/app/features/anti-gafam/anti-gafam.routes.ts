import { Routes } from '@angular/router';

export const antiGafamRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./anti-gafam-presentation/anti-gafam-presentation.component').then(m => m.AntiGafamPresentationComponent)
  },
  {
    path: 'jeu',
    loadComponent: () => import('./space-invader-game/space-invader-game.component').then(m => m.SpaceInvaderGameComponent)
  }
];
