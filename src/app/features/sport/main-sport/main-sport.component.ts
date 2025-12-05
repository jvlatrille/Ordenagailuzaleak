import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SportProfile {
  level: 'beginner' | 'intermediate' | 'advanced' | null;
  sports: string[];
  objectives: string[];
  injuries: string[];
}

interface Movement {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl?: string;
  benefits: string[];
  decathlonProducts?: Product[];
}

interface Product {
  name: string;
  category: string;
  link: string;
}

@Component({
  selector: 'app-main-sport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-sport.component.html',
  styleUrl: './main-sport.component.css'
})
export class MainSportComponent {
  currentStep: 1 | 2 | 3 | 4 = 1;
  steps: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];
  
  // Niveau 1: Profilage Sportif
  sportProfile: SportProfile = {
    level: null,
    sports: [],
    objectives: [],
    injuries: []
  };

  levelOptions = ['Débutant', 'Intermédiaire', 'Avancé'];
  levelMapping: { [key: string]: 'beginner' | 'intermediate' | 'advanced' } = {
    'Débutant': 'beginner',
    'Intermédiaire': 'intermediate',
    'Avancé': 'advanced'
  };
  sportsOptions = ['Yoga', 'Musculation', 'Course', 'Natation', 'Cyclisme', 'CrossFit', 'Pilates', 'Football'];
  objectivesOptions = ['Renforcement', 'Flexibilité', 'Endurance', 'Perte de poids', 'Rééducation'];
  injuriesOptions = ['Dos', 'Genoux', 'Épaules', 'Chevilles', 'Hanches', 'Aucune'];

  // Niveau 3: Mouvements avec illustrations
  availableMovements: Movement[] = [
    {
      id: 'squat',
      name: 'Squat',
      description: 'Exercice de base pour renforcer les jambes',
      instructions: [
        'Écartez vos pieds à la largeur des épaules',
        'Les orteils légèrement tournés vers l\'extérieur',
        'Accroupissez-vous en gardant le dos droit',
        'Les genoux ne doivent pas dépasser vos orteils',
        'Inspirez en descendant, expirez en remontant',
        'Faites 3 séries de 12 répétitions'
      ],
      difficulty: 'easy',
      benefits: ['Force des jambes', 'Stabilité du core', 'Brûlure de calories'],
      decathlonProducts: [
        { name: 'Haltères réglables', category: 'Musculation', link: 'https://www.decathlon.fr/p/halteres-musculation/_/R-p-2279' },
        { name: 'Chaussures de training', category: 'Chaussures', link: 'https://www.decathlon.fr/p/chaussures-fitness-cardio/_/R-p-300739' }
      ]
    },
    {
      id: 'pushup',
      name: 'Pompes',
      description: 'Exercice pour renforcer les bras et la poitrine',
      instructions: [
        'Allongez-vous face au sol',
        'Les mains à la largeur des épaules',
        'Les pieds joints ou légèrement écartés',
        'Levez votre corps en utilisant vos bras',
        'Gardez votre corps droit comme une planche',
        'Descendez jusqu\'à ce que votre poitrine touche presque le sol',
        'Faites 3 séries de 10 répétitions'
      ],
      difficulty: 'medium',
      benefits: ['Force des bras', 'Renforcement du core', 'Endurance'],
      decathlonProducts: [
        { name: 'Poignées de pompes', category: 'Musculation', link: 'https://www.decathlon.fr/p/poignees-pompes/_/R-p-145238' },
        { name: 'Tapis de sol fitness', category: 'Tapis', link: 'https://www.decathlon.fr/p/tapis-sol-fitness/_/R-p-1929' }
      ]
    },
    {
      id: 'plank',
      name: 'Gainage (Planche)',
      description: 'Exercice d\'isométrie pour renforcer le core',
      instructions: [
        'Allongez-vous face au sol',
        'Levez votre corps sur vos avant-bras et orteils',
        'Votre corps doit former une ligne droite',
        'Contractez vos abdominaux',
        'Maintenez la position 30 à 60 secondes',
        'Respirez régulièrement',
        'Faites 3 séries'
      ],
      difficulty: 'medium',
      benefits: ['Renforcement du core', 'Posture', 'Équilibre'],
      decathlonProducts: [
        { name: 'Tapis de fitness épais', category: 'Tapis', link: 'https://www.decathlon.fr/p/tapis-gym-pilates/_/R-p-11159' },
        { name: 'Chronomètre fitness', category: 'Accessoires', link: 'https://www.decathlon.fr/p/chronometre-sport/_/R-p-5740' }
      ]
    },
    {
      id: 'yoga-downdog',
      name: 'Yoga - Chien tête en bas',
      description: 'Posture de yoga pour l\'étirement et la flexibilité',
      instructions: [
        'Commencez à quatre pattes',
        'Les mains à la largeur des épaules',
        'Les pieds à la largeur des hanches',
        'Levez vos hanches vers le ciel',
        'Votre corps doit former un triangle',
        'Maintenez vos mains fermement au sol',
        'Maintenez 30 à 45 secondes',
        'Répétez 3 à 5 fois'
      ],
      difficulty: 'easy',
      benefits: ['Flexibilité', 'Étirement du dos', 'Soulagement du stress'],
      decathlonProducts: [
        { name: 'Tapis de yoga', category: 'Yoga', link: 'https://www.decathlon.fr/p/tapis-yoga/_/R-p-301537' },
        { name: 'Briques de yoga', category: 'Accessoires yoga', link: 'https://www.decathlon.fr/p/brique-yoga/_/R-p-301541' }
      ]
    },
    {
      id: 'lunges',
      name: 'Fentes',
      description: 'Exercice pour renforcer les jambes de manière équilibrée',
      instructions: [
        'Tenez-vous debout, les pieds à la largeur des hanches',
        'Faites un pas en avant avec la jambe droite',
        'Abaissez votre corps jusqu\'à ce que votre genou arrière frôle le sol',
        'Le genou avant ne doit pas dépasser votre orteil',
        'Poussez avec votre jambe avant pour revenir à la position de départ',
        'Alternez les jambes',
        'Faites 3 séries de 12 répétitions par jambe'
      ],
      difficulty: 'medium',
      benefits: ['Force des jambes', 'Équilibre', 'Flexibilité des hanches'],
      decathlonProducts: [
        { name: 'Bandes élastiques de résistance', category: 'Musculation', link: 'https://www.decathlon.fr/p/bande-elastique-fitness/_/R-p-307273' },
        { name: 'Haltères poids légers', category: 'Musculation', link: 'https://www.decathlon.fr/p/halteres-vinyle/_/R-p-2278' }
      ]
    }
  ];

  selectedMovement: Movement | null = null;
  customInstructions: string[] = [];

  toggleSport(sport: string) {
    const index = this.sportProfile.sports.indexOf(sport);
    if (index > -1) {
      this.sportProfile.sports.splice(index, 1);
    } else {
      this.sportProfile.sports.push(sport);
    }
  }

  toggleObjective(objective: string) {
    const index = this.sportProfile.objectives.indexOf(objective);
    if (index > -1) {
      this.sportProfile.objectives.splice(index, 1);
    } else {
      this.sportProfile.objectives.push(objective);
    }
  }

  toggleInjury(injury: string) {
    const index = this.sportProfile.injuries.indexOf(injury);
    if (index > -1) {
      this.sportProfile.injuries.splice(index, 1);
    } else {
      this.sportProfile.injuries.push(injury);
    }
  }

  canProceedToStep2(): boolean {
    return this.sportProfile.sports.length > 0;
  }

  canAccessStep(step: 1 | 2 | 3 | 4): boolean {
    if (step === 1) return true;
    if (step === 2) return this.canProceedToStep2();
    if (step === 3) return this.canProceedToStep2();
    if (step === 4) return this.canProceedToStep2() && this.selectedMovement !== null;
    return false;
  }

  proceedToStep(step: 1 | 2 | 3 | 4) {
    if (!this.canAccessStep(step)) {
      if (step === 2 || step === 3) {
        alert('Veuillez compléter votre profil sportif');
      } else if (step === 4) {
        alert('Veuillez sélectionner un mouvement');
      }
      return;
    }
    this.currentStep = step;
  }

  selectMovement(movement: Movement) {
    this.selectedMovement = movement;
    this.generateCustomInstructions();
  }

  generateCustomInstructions() {
    if (!this.selectedMovement) return;
    
    this.customInstructions = [...this.selectedMovement.instructions];
    
    // Adaptations selon le niveau
    if (this.sportProfile.level === 'beginner') {
      if (this.selectedMovement.difficulty === 'hard') {
        this.customInstructions.unshift('⚠️ ADAPTATION DÉBUTANT : Cet exercice est difficile, commencez par une version simplifiée');
      }
      this.customInstructions.push('💡 Débutant : Réduisez le nombre de répétitions de moitié au début');
      this.customInstructions.push('⏱️ Prenez votre temps entre chaque répétition');
    } else if (this.sportProfile.level === 'advanced') {
      this.customInstructions.push('🔥 Avancé : Augmentez les répétitions de 50% ou ajoutez du poids');
      this.customInstructions.push('💪 Essayez des variantes plus difficiles (une jambe, tempo lent, etc.)');
    }
    
    // Adaptations selon les zones sensibles
    const sensitiveAreas = this.sportProfile.injuries.filter(i => i !== 'Aucune');
    
    if (sensitiveAreas.includes('Genoux') && 
        ['squat', 'lunges'].includes(this.selectedMovement.id)) {
      this.customInstructions.unshift('⚠️ GENOUX SENSIBLES : Limitez l\'amplitude (quart de squat), ne dépassez pas 45°');
      this.customInstructions.push('💙 Arrêtez si vous ressentez une gêne au niveau des genoux');
    }
    
    if (sensitiveAreas.includes('Dos') && 
        ['plank', 'pushup', 'squat'].includes(this.selectedMovement.id)) {
      this.customInstructions.unshift('⚠️ DOS SENSIBLE : Gardez le dos bien droit et engagez vos abdominaux');
      this.customInstructions.push('🦴 Ne cambrez jamais le dos, restez aligné');
    }
    
    if (sensitiveAreas.includes('Épaules') && 
        ['pushup', 'yoga-downdog'].includes(this.selectedMovement.id)) {
      this.customInstructions.unshift('⚠️ ÉPAULES SENSIBLES : Réduisez l\'amplitude, gardez les épaules basses');
      this.customInstructions.push('💪 Si douleur, faites la version sur les genoux');
    }
    
    if (sensitiveAreas.includes('Chevilles') && 
        ['lunges', 'squat'].includes(this.selectedMovement.id)) {
      this.customInstructions.unshift('⚠️ CHEVILLES SENSIBLES : Privilégiez une surface stable et plane');
      this.customInstructions.push('🦶 Portez des chaussures avec bon maintien');
    }
    
    if (sensitiveAreas.includes('Hanches') && 
        ['lunges', 'yoga-downdog'].includes(this.selectedMovement.id)) {
      this.customInstructions.unshift('⚠️ HANCHES SENSIBLES : Limitez l\'amplitude des mouvements');
      this.customInstructions.push('🦴 Évitez les rotations excessives');
    }
    
    // Adaptations selon les objectifs
    if (this.sportProfile.objectives.includes('Flexibilité')) {
      this.customInstructions.push('🤸 Objectif flexibilité : Maintenez les positions étirées plus longtemps');
    }
    
    if (this.sportProfile.objectives.includes('Endurance')) {
      this.customInstructions.push('⏰ Objectif endurance : Augmentez le nombre de séries progressivement');
    }
    
    if (this.sportProfile.objectives.includes('Renforcement')) {
      this.customInstructions.push('💪 Objectif renforcement : Ajoutez du poids ou ralentissez l\'exécution');
    }
  }

  getFilteredMovements(): Movement[] {
    return this.availableMovements.filter(movement => {
      const levelMatch = this.sportProfile.level === 'beginner' ? 
        movement.difficulty !== 'hard' : true;
      
      return levelMatch;
    });
  }

  setLevel(level: string) {
    console.log('setLevel called with', level);
    this.sportProfile.level = this.levelMapping[level];
  }

  getLevelLabel(): string {
    if (!this.sportProfile.level) return 'aucun';
    const entry = Object.entries(this.levelMapping).find(([_, val]) => val === this.sportProfile.level);
    return entry ? entry[0] : 'aucun';
  }

  getPersonalizedInstructions(): string[] {
    const instructions: string[] = [];
    
    // Instructions basées sur le niveau
    if (this.sportProfile.level === 'beginner') {
      instructions.push('🟢 Débutant : Commencez par des exercices simples et écoutez votre corps');
      instructions.push('⏱️ Prenez des pauses régulières (1-2 minutes entre les séries)');
      instructions.push('📉 Ne forcez jamais au-delà de votre confort');
    } else if (this.sportProfile.level === 'intermediate') {
      instructions.push('🟡 Intermédiaire : Augmentez progressivement l\'intensité');
      instructions.push('⏱️ Réduisez les temps de repos (30-60 secondes)');
      instructions.push('💪 Concentrez-vous sur la qualité du mouvement');
    } else if (this.sportProfile.level === 'advanced') {
      instructions.push('🔴 Avancé : Poussez vos limites avec des variantes difficiles');
      instructions.push('⏱️ Temps de repos courts (20-45 secondes)');
      instructions.push('🎯 Ajoutez des charges ou augmentez les répétitions');
    }

    // Instructions basées sur les sports sélectionnés
    if (this.sportProfile.sports.includes('Yoga') || this.sportProfile.sports.includes('Pilates')) {
      instructions.push('🧘 Respirez profondément et concentrez-vous sur votre alignement');
    }
    if (this.sportProfile.sports.includes('Musculation') || this.sportProfile.sports.includes('CrossFit')) {
      instructions.push('🏋️ Échauffez-vous avec des mouvements dynamiques pendant 5-10 minutes');
    }
    if (this.sportProfile.sports.includes('Course') || this.sportProfile.sports.includes('Cyclisme')) {
      instructions.push('🏃 Pensez à étirer vos jambes avant et après l\'effort');
    }

    // Instructions basées sur les objectifs
    if (this.sportProfile.objectives.includes('Flexibilité')) {
      instructions.push('🤸 Maintenez chaque étirement pendant au moins 30 secondes');
    }
    if (this.sportProfile.objectives.includes('Renforcement')) {
      instructions.push('💪 Augmentez progressivement le nombre de répétitions chaque semaine');
    }
    if (this.sportProfile.objectives.includes('Endurance')) {
      instructions.push('⏰ Augmentez la durée de vos séances progressivement');
    }
    if (this.sportProfile.objectives.includes('Perte de poids')) {
      instructions.push('🔥 Combinez exercices cardio et renforcement musculaire');
      instructions.push('💧 Hydratez-vous régulièrement avant, pendant et après l\'exercice');
    }
    if (this.sportProfile.objectives.includes('Rééducation')) {
      instructions.push('❤️‍🩹 Allez-y très progressivement et consultez un professionnel si nécessaire');
    }

    // Instructions basées sur les zones sensibles
    if (this.sportProfile.injuries.length > 0 && !this.sportProfile.injuries.includes('Aucune')) {
      instructions.push('⚠️ Zones sensibles détectées : ' + this.sportProfile.injuries.filter(i => i !== 'Aucune').join(', '));
      
      if (this.sportProfile.injuries.includes('Dos')) {
        instructions.push('🦴 Dos sensible : Gardez le dos droit, engagez vos abdominaux, évitez les torsions brusques');
      }
      if (this.sportProfile.injuries.includes('Genoux')) {
        instructions.push('🦵 Genoux sensibles : Ne dépassez jamais vos orteils en flexion, limitez l\'amplitude');
      }
      if (this.sportProfile.injuries.includes('Épaules')) {
        instructions.push('💪 Épaules sensibles : Évitez les mouvements brusques au-dessus de la tête');
      }
      if (this.sportProfile.injuries.includes('Chevilles')) {
        instructions.push('🦶 Chevilles sensibles : Privilégiez des surfaces stables, évitez les sauts');
      }
      if (this.sportProfile.injuries.includes('Hanches')) {
        instructions.push('🦴 Hanches sensibles : Limitez l\'amplitude des mouvements de rotation');
      }
    }

    // Instructions générales
    instructions.push('✅ Échauffez-vous toujours 5-10 minutes avant de commencer');
    instructions.push('💧 Hydratez-vous régulièrement');
    instructions.push('🛑 Arrêtez immédiatement en cas de douleur aiguë');

    return instructions;
  }

  getInjuriesDisplay(): string {
    return this.sportProfile.injuries
      .filter(i => i !== 'Aucune')
      .join(', ');
  }

  resetProfile() {
    this.sportProfile = {
      level: null,
      sports: [],
      objectives: [],
      injuries: []
    };
    this.selectedMovement = null;
    this.currentStep = 1;
  }
}
