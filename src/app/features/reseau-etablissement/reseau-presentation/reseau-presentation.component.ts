import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FloatingBackBtnComponent } from '../../../shared/components/floating-back-btn/floating-back-btn.component';

@Component({
  selector: 'app-reseau-presentation',
  standalone: true,
  imports: [RouterModule, FloatingBackBtnComponent],
  templateUrl: './reseau-presentation.component.html',
  styleUrl: './reseau-presentation.component.css'
})
export class ReseauPresentationComponent {}
