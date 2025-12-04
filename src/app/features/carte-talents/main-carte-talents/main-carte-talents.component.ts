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
  styleUrl: './main-carte-talents.component.css'
})
export class MainCarteTalentsComponent {
  // Membres du Bureau
  bureauMembers: TeamMember[] = [
    {
      name: 'Prénom',
      surname: 'NOM',
      role: 'Président',
      image: 'assets/team/placeholder.jpg'
    },
    {
      name: 'Prénom',
      surname: 'NOM',
      role: 'Vice-Président',
      image: 'assets/team/placeholder.jpg'
    },
    {
      name: 'Prénom',
      surname: 'NOM',
      role: 'Secrétaire',
      image: 'assets/team/placeholder.jpg'
    },
    {
      name: 'Prénom',
      surname: 'NOM',
      role: 'Trésorier',
      image: 'assets/team/placeholder.jpg'
    }
  ];

  // Pôle Communication
  communicationMembers: TeamMember[] = [
    {
      name: 'Prénom',
      surname: 'NOM',
      role: 'Responsable Com',
      image: 'assets/team/placeholder.jpg'
    },
    {
      name: 'Prénom',
      surname: 'NOM',
      role: 'Community Manager',
      image: 'assets/team/placeholder.jpg'
    }
  ];

  // Pôle Développement
  devMembers: TeamMember[] = [
    {
      name: 'Prénom',
      surname: 'NOM',
      role: 'Lead Developer',
      image: 'assets/team/placeholder.jpg'
    },
    {
      name: 'Prénom',
      surname: 'NOM',
      role: 'Développeur Full-Stack',
      image: 'assets/team/placeholder.jpg'
    },
    {
      name: 'Prénom',
      surname: 'NOM',
      role: 'Développeur Front-End',
      image: 'assets/team/placeholder.jpg'
    }
  ];

  // Pôle Technique
  techMembers: TeamMember[] = [
    {
      name: 'Prénom',
      surname: 'NOM',
      role: 'Responsable Technique',
      image: 'assets/team/placeholder.jpg'
    },
    {
      name: 'Prénom',
      surname: 'NOM',
      role: 'Admin Système',
      image: 'assets/team/placeholder.jpg'
    }
  ];
}
