import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-intro2',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './intro2.component.html',
  styleUrl: './intro2.component.css'
})
export class Intro2Component implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Vérifie que le flux a bien commencé (qu'on vient d'intro1)
    const started = localStorage.getItem('introStarted');
    if (started !== 'true') {
      this.router.navigate(['/']);
      return;
    }
    localStorage.setItem('introCompleted', 'true');
  }
}
