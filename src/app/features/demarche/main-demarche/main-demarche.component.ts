import { Component } from '@angular/core';
import { Quizz } from '../composant/quizz/quizz';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FloatingBackBtnComponent } from '../../../shared/components/floating-back-btn/floating-back-btn.component';

@Component({
  selector: 'app-main-demarche',
  standalone: true,
  imports: [CommonModule, RouterModule, Quizz, FloatingBackBtnComponent],
  templateUrl: './main-demarche.component.html',
  styleUrls: ['./main-demarche.component.css']
})
export class MainDemarcheComponent {

}
