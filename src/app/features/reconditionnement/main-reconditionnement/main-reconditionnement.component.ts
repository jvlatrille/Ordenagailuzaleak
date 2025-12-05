import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Nécessaire pour *ngIf et [class]

// Définition des types pour un code plus robuste
type GameState = 'finding' | 'refurbishing';
type ToolType = 'clean' | 'hdd' | 'ram';

@Component({
  selector: 'app-main-reconditionnement',
  standalone: true,
  imports: [CommonModule], // Ajout indispensable pour que le HTML fonctionne
  templateUrl: './main-reconditionnement.component.html',
  styleUrl: './main-reconditionnement.component.css'
})
export class MainReconditionnementComponent {

  // --- ÉTAT GLOBAL DU JEU ---
  gameState: GameState = 'finding';
  feedbackMessage: string | null = null;
  private messageTimeout: any; // Pour gérer le timer du message

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

  constructor() { }

  /**
   * Gère les clics sur les leurres (bureau, poubelle)
   * Affiche un message d'erreur ludique.
   */
  checkSpot(spot: string): void {
    if (this.cupboardOpen) return; // Si l'armoire est déjà ouverte, on ignore les clics ailleurs

    const messages = [
      "Rien ici... juste des vieux papiers.",
      "Non, ce n'est pas là.",
      "Cherche encore !",
      "Regarde dans les meubles fermés..."
    ];

    // Affiche un message aléatoire
    this.showFeedback(messages[Math.floor(Math.random() * messages.length)]);
  }

  /**
   * Gère le clic sur l'armoire (la bonne cachette)
   */
  clickCupboard(): void {
    if (!this.cupboardOpen) {
      // Premier clic : On ouvre l'armoire
      this.cupboardOpen = true;
      this.showFeedback("Ah ! Il y a quelque chose à l'intérieur !");
    } else {
      // Deuxième clic (si ouverte) : On récupère l'ordinateur
      this.showFeedback("🎉 Ordinateur récupéré ! Au travail !");
      
      // Petite pause avant de changer d'écran pour la fluidité
      setTimeout(() => {
        this.gameState = 'refurbishing';
        this.feedbackMessage = null;
      }, 1000);
    }
  }

  /**
   * Gère l'utilisation des outils de réparation
   * @param tool Le type d'outil cliqué ('clean', 'hdd', ou 'ram')
   */
  useTool(tool: ToolType): void {
    // Règle du jeu : On doit nettoyer (clean) en premier
    if (tool !== 'clean' && !this.refurbishSteps.cleaned) {
      this.showFeedback("⚠️ Il faut d'abord nettoyer la poussière !");
      return;
    }

    // CORRECTION ICI : On mappe 'clean' vers 'cleaned' pour éviter l'erreur TS
    const stepKey = tool === 'clean' ? 'cleaned' : tool;

    // Si l'outil est déjà utilisé (étape validée), on ne fait rien
    if (this.refurbishSteps[stepKey]) return;

    // Applique l'action (valide l'étape)
    this.refurbishSteps[stepKey] = true;

    // Feedback visuel spécifique à l'action
    if (tool === 'clean') this.showFeedback("C'est propre ! Maintenant, on upgrade.");
    if (tool === 'hdd') this.showFeedback("Nouveau SSD installé : Vitesse x10 !");
    if (tool === 'ram') this.showFeedback("Mémoire vive ajoutée !");

    // Vérifie si toutes les conditions de victoire sont remplies
    this.checkWinCondition();
  }

  /**
   * Vérifie si toutes les étapes de réparation sont terminées
   */
  checkWinCondition(): void {
    if (this.refurbishSteps.cleaned && 
        this.refurbishSteps.hdd && 
        this.refurbishSteps.ram) {
      
      // Petit délai pour laisser l'utilisateur voir le résultat final (PC vert/Matrix) avant la popup
      setTimeout(() => {
        this.showSuccessPopup = true;
      }, 800);
    }
  }

  /**
   * Affiche un message temporaire à l'écran (toast)
   */
  private showFeedback(msg: string): void {
    // Si un message est déjà affiché, on annule son effacement précédent
    if (this.messageTimeout) clearTimeout(this.messageTimeout);

    this.feedbackMessage = msg;

    // On efface le message après 2 secondes
    this.messageTimeout = setTimeout(() => {
      this.feedbackMessage = null;
    }, 2000);
  }

  /**
   * Réinitialise le jeu pour recommencer une partie
   */
  resetGame(): void {
    this.gameState = 'finding';
    this.cupboardOpen = false;
    this.refurbishSteps = { cleaned: false, hdd: false, ram: false };
    this.showSuccessPopup = false;
    this.feedbackMessage = null;
  }
}