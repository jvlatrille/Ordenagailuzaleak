import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-intro1',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './intro1.component.html',
  styleUrl: './intro1.component.css'
})
export class Intro1Component implements OnInit {
  ngOnInit() {
    // Affiche toujours intro1, marque juste qu'on a commencé le flux
    localStorage.setItem('introStarted', 'true');
  }
}
