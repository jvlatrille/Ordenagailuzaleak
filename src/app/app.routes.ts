import { Routes } from '@angular/router';
import { Intro1Component } from './features/intro1/intro1.component';
import { Intro2Component } from './features/intro2/intro2.component';
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
    component: Intro1Component
  },
  {
    path: 'intro2',
    component: Intro2Component
  },
  {
    path: 'home',
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
  
  {
    path: '**',
    redirectTo: ''
  }
];
