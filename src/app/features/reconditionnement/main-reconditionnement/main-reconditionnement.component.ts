import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router'; // IMPORTANT : Import du Router

type GameState = 'finding' | 'refurbishing';
type ToolType = 'clean' | 'hdd' | 'ram';

@Component({
  selector: 'app-main-reconditionnement',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './main-reconditionnement.component.html',
  styleUrl: './main-reconditionnement.component.css'
})
export class MainReconditionnementComponent {

  // --- ÉTAT GLOBAL DU JEU ---
  gameState: GameState = 'finding';
  feedbackMessage: string | null = null;
  private messageTimeout: any; 

  // --- ÉTAPE 1 : LA RECHERCHE (FINDING) ---
  cupboardOpen: boolean = false;

  // --- ÉTAPE 2 : LE RECONDITIONNEMENT (REFURBISHING) ---
  refurbishSteps = {
    cleaned: false,
    hdd: false,
    ram: false
  };

  // --- ÉTAPE 3 : FIN (POPUP) ---
  showSuccessPopup: boolean = false;

  // Injection du Router
  constructor(private router: Router) { }

  checkSpot(spot: string): void {
    if (this.cupboardOpen) return; 

    const messages = [
      "Rien ici... juste des vieux papiers.",
      "Non, ce n'est pas là.",
      "Cherche encore !",
      "Regarde dans les meubles fermés..."
    ];

    this.showFeedback(messages[Math.floor(Math.random() * messages.length)]);
  }

  clickCupboard(): void {
    if (this.cupboardOpen) return; 

    this.cupboardOpen = true;
    this.showFeedback("Ah ! Il y a quelque chose à l'intérieur !");

    setTimeout(() => {
        this.showFeedback("🎉 Ordinateur récupéré ! Au travail !");
        
        setTimeout(() => {
            this.gameState = 'refurbishing';
            this.feedbackMessage = null;
        }, 1500);
        
    }, 1000); 
  }

  useTool(tool: ToolType): void {
    if (tool !== 'clean' && !this.refurbishSteps.cleaned) {
      this.showFeedback("⚠️ Il faut d'abord nettoyer la poussière !");
      return;
    }

    const stepKey = tool === 'clean' ? 'cleaned' : tool;
    if (this.refurbishSteps[stepKey]) return;

    this.refurbishSteps[stepKey] = true;

    if (tool === 'clean') this.showFeedback("C'est propre ! Maintenant, on upgrade.");
    if (tool === 'hdd') this.showFeedback("Nouveau SSD installé : Vitesse x10 !");
    if (tool === 'ram') this.showFeedback("Mémoire vive ajoutée !");
    
    // NOTE : On ne vérifie plus la victoire ici automatiquement
    // Le bouton "Et après ?" apparaîtra grâce au *ngIf dans le HTML
  }

  // Nouvelle méthode appelée par le bouton "Et après ?"
  openFinalPopup(): void {
      this.showSuccessPopup = true;
  }

  // Nouvelle méthode pour naviguer vers Linux
  goToLinux(): void {
      this.router.navigate(['/linux']); 
  }

  private showFeedback(msg: string): void {
    if (this.messageTimeout) clearTimeout(this.messageTimeout);

    this.feedbackMessage = msg;

    this.messageTimeout = setTimeout(() => {
      this.feedbackMessage = null;
    }, 2000);
  }

  resetGame(): void {
    this.gameState = 'finding';
    this.cupboardOpen = false;
    this.refurbishSteps = { cleaned: false, hdd: false, ram: false };
    this.showSuccessPopup = false;
    this.feedbackMessage = null;
  }
}