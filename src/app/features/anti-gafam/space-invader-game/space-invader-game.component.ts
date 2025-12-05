import { Component } from '@angular/core';
import { SpaceInvader } from '../space-invader/space-invader';
import { CommonModule } from '@angular/common';
import { FloatingBackBtnComponent } from '../../../shared/components/floating-back-btn/floating-back-btn.component';

@Component({
  selector: 'app-space-invader-game',
  standalone: true,
  imports: [SpaceInvader, CommonModule, FloatingBackBtnComponent],
  templateUrl: './space-invader-game.component.html',
  styleUrl: './space-invader-game.component.css'
})
export class SpaceInvaderGameComponent {}
