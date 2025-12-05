import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Permet d'accéder à home si les intros ont été complétées
    const completed = localStorage.getItem('introCompleted');
    if (completed !== 'true') {
      this.router.navigate(['/']);
      return;
    }
    this.setupHoverSync();
  }

  setupHoverSync() {
    // Récupère tous les éléments avec data-target
    const menuLinks = document.querySelectorAll<HTMLElement>('a[data-target]');
    const pinButtons = document.querySelectorAll<HTMLElement>('button[data-target]');

    // Pour chaque lien du menu
    menuLinks.forEach(link => {
      const target = link.getAttribute('data-target');
      link.addEventListener('mouseenter', () => {
        // Ajoute la classe 'sync-hover' à tous les pins avec le même data-target
        pinButtons.forEach(btn => {
          if (btn.getAttribute('data-target') === target) {
            btn.classList.add('sync-hover');
          }
        });
        link.classList.add('sync-hover');
      });
      link.addEventListener('mouseleave', () => {
        pinButtons.forEach(btn => {
          if (btn.getAttribute('data-target') === target) {
            btn.classList.remove('sync-hover');
          }
        });
        link.classList.remove('sync-hover');
      });
    });

    // Pour chaque pin
    pinButtons.forEach(btn => {
      const target = btn.getAttribute('data-target');
      btn.addEventListener('mouseenter', () => {
        // Ajoute la classe 'sync-hover' à tous les liens avec le même data-target
        menuLinks.forEach(link => {
          if (link.getAttribute('data-target') === target) {
            link.classList.add('sync-hover');
          }
        });
        btn.classList.add('sync-hover');
      });
      btn.addEventListener('mouseleave', () => {
        menuLinks.forEach(link => {
          if (link.getAttribute('data-target') === target) {
            link.classList.remove('sync-hover');
          }
        });
        btn.classList.remove('sync-hover');
      });
    });
  }
}
