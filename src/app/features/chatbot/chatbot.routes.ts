import { Routes } from '@angular/router';

export const chatbotRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-chatbot/main-chatbot.component').then(m => m.MainChatbotComponent)
  }
];
