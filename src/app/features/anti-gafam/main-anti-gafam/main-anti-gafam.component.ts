import { Component, Renderer2 } from '@angular/core';
import { SpaceInvader } from '../space-invader/space-invader';
import { CommonModule } from '@angular/common';
import { FloatingBackBtnComponent } from '../../../shared/components/floating-back-btn/floating-back-btn.component';

@Component({
  selector: 'app-main-anti-gafam',
  imports: [SpaceInvader, CommonModule, FloatingBackBtnComponent ],
  templateUrl: './main-anti-gafam.component.html',
  styleUrl: './main-anti-gafam.component.css'
})
export class MainAntiGafamComponent {
  isLoadingGame: boolean = false; // Pour contrôler l'animation de chargement
  isGameActive: boolean = false; // Pour activer le composant de jeu

  constructor(private renderer: Renderer2) { }

  startGame(): void {
    this.isGameActive = !this.isGameActive; // Démarre l'animation de chargement

  }
}
