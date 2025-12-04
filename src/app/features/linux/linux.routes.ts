import { Routes } from '@angular/router';

export const linuxRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-linux/main-linux.component').then(m => m.MainLinuxComponent)
  }
];
