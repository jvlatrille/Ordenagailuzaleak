import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FloatingBackBtnComponent } from '../../../shared/components/floating-back-btn/floating-back-btn.component';

@Component({
  selector: 'app-anti-gafam-presentation',
  standalone: true,
  imports: [RouterModule, FloatingBackBtnComponent],
  templateUrl: './anti-gafam-presentation.component.html',
  styleUrl: './anti-gafam-presentation.component.css'
})
export class AntiGafamPresentationComponent {}
