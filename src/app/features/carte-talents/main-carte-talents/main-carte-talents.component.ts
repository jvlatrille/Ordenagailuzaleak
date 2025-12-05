import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface TeamMember {
  name: string;
  surname: string;
  role: string;
  image: string;
}

@Component({
  selector: 'app-main-carte-talents',
  imports: [CommonModule],
  templateUrl: './main-carte-talents.component.html',
  styleUrls: ['./main-carte-talents.component.css']
})
export class MainCarteTalentsComponent {
  
}
