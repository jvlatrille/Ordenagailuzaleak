import { Routes } from '@angular/router';
import { reconditionnementRoutes } from './features/reconditionnement/reconditionnement.routes';
import { linuxRoutes } from './features/linux/linux.routes';
import { reseauEtablissementRoutes } from './features/reseau-etablissement/reseau-etablissement.routes';
import { demarcheRoutes } from './features/demarche/demarche.routes';
import { antiGafamRoutes } from './features/anti-gafam/anti-gafam.routes';
import { sportRoutes } from './features/sport/sport.routes';
import { carteTalentsRoutes } from './features/carte-talents/carte-talents.routes';
import { chatbotRoutes } from './features/chatbot/chatbot.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'reconditionnement',
    children: reconditionnementRoutes
  },
  
  {
    path: 'linux',
    children: linuxRoutes
  },
  
  {
    path: 'reseau-etablissement',
    children: reseauEtablissementRoutes
  },
  
  {
    path: 'demarche',
    children: demarcheRoutes
  },

  {
    path: 'anti-gafam',
    children: antiGafamRoutes
  },

  {
    path: 'sport',
    children: sportRoutes
  },

  {
    path: 'carte-talents',
    children: carteTalentsRoutes
  },

  {
    path: 'chatbot',
    children: chatbotRoutes
  },
  
  // Wildcard route - redirige toute route non répertoriée vers la racine
  {
    path: '**',
    redirectTo: ''
  }
];
