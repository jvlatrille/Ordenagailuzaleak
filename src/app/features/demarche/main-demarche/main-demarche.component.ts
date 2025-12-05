import { Component } from '@angular/core';
import { Quizz } from '../composant/quizz/quizz';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-demarche',
  standalone: true,
  imports: [CommonModule, RouterModule, Quizz],
  templateUrl: './main-demarche.component.html',
  styleUrls: ['./main-demarche.component.css']
})
export class MainDemarcheComponent {

}
