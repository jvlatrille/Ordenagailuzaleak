import { Component, ChangeDetectorRef } from '@angular/core'; // <--- AJOUTER ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { QuestionModel as Question } from '../question/question.model';
import { QuestionComponent } from '../question/question';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [QuestionComponent, CommonModule],
  templateUrl: './quizz.html',
  styleUrls: ['./quizz.css'],
})
export class Quizz {

  questions: Question[];
  indexQuestion: number = 0;
  nbQuestions: number = 0;
  nbCorrectReponses: number = 0;

  selectedReponse: string | null = null;
  revealAnswers: boolean = false;
  answerStates: ('correct' | 'wrong' | 'neutral')[] = [];

  // INJECTER LE DETECTEUR DE CHANGEMENT DANS LE CONSTRUCTEUR
  constructor(private cdRef: ChangeDetectorRef) {
    this.questions = [
      new Question('Quel événement technique est cité comme déclencheur principal de l\'urgence d\'agir ?', ['La panne mondiale d\'Internet', 'L\'augmentation du prix des processeurs', 'La sortie d\'un nouveau virus informatique', 'La fin du support de Windows 10'], 3),
      new Question('Quelle solution technique est explicitement promue pour lutter contre l\'obsolescence programmée ?', ['L\'utilisation du système d\'exploitation libre Linux', 'L\'usage de Linux', 'Le passage à macOS', 'L\'achat de nouveaux ordinateurs plus puissants'], 1),
      new Question('Quel est l\'objectif principal concernant le matériel informatique dans la démarche NIRD ?', ['Le recyclage systématique', 'La vente aux enchères', 'Le réemploi et le reconditionnement', 'La location longue durée'], 2),
    ];
    this.nbQuestions = this.questions.length;
  }

  onReponseSelected(reponse: string) {
    this.selectedReponse = reponse;
  }

  validerReponse() {
    // Sécurité : si on est à la fin, on arrête
    if (this.indexQuestion >= this.nbQuestions) return;

    const currentQ = this.questions[this.indexQuestion];
    const correctIndex = currentQ.responseCorresctIndex;

    // 1. Calculer les couleurs
    this.answerStates = currentQ.reponses.map((r, i) => {
      if (i === correctIndex) return 'correct';
      if (r === this.selectedReponse && i !== correctIndex) return 'wrong';
      return 'neutral';
    });

    if (this.selectedReponse === currentQ.reponses[correctIndex]) {
      this.nbCorrectReponses++;
    }

    // 2. Montrer les réponses
    this.revealAnswers = true;

    // Forcer la mise à jour visuelle immédiate
    this.cdRef.detectChanges();

    // 3. Attendre 2 secondes et changer
    setTimeout(() => {

      this.revealAnswers = false;
      this.answerStates = [];
      this.selectedReponse = null;
      this.indexQuestion++; // <--- On change l'index ICI

      // LA CLE DU SUCCES : On force Angular à redessiner l'écran
      this.cdRef.detectChanges();

    }, 500);
  }
}