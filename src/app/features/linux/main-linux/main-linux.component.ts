import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { DragDropModule, CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-linux',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './main-linux.component.html',
  styleUrls: ['./main-linux.component.css'],
})
export class MainLinuxComponent {
  @ViewChild('pcDropZone') pcDropZone!: ElementRef;

  currentState: 'windows' | 'bsod' | 'booting' | 'terminal' | 'success' = 'windows';
  showUsb = true;
  isPlugged = false;
  isDragging = false;
  isOverZone = false;
  dragPosition = { x: 0, y: 0 };
  showReport = false;

  bootLogs: string[] = [];
  biosLines = [
    'AMIBIOS (C) 2005 American Megatrends, Inc.',
    'CPU : Intel Pentium 4 @ 2.40GHz',
    'Checking NVRAM.. OK',
    '512MB RAM DETECTED',
    'USB Device Found : Linux NIRD KEY',
    'Loading Eco-Kernel...',
    'Booting Linux NIRD...',
  ];

  // Commande d'installation
  fullCommand =
    'sudo install-linux NIRD--save-planet\n> Formatting Windows...\n> Installing Linux NIRD. System is ready.';
  currentTypedText = '';
  charIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.currentState = 'bsod';
      this.cdr.detectChanges();
    }, 3000);
  }

  // --- GESTION DU DRAG & DROP ---

  onDragStarted(event: CdkDragStart) {
    this.isDragging = true;
  }

  onDragMoved(event: CdkDragMove) {
    this.isOverZone = this.checkCollision(event.pointerPosition);
  }

  checkDrop(event: CdkDragEnd) {
    this.isDragging = false;
    const isHit = this.checkCollision(event.dropPoint);

    if (isHit && this.currentState === 'bsod') {
      this.plugUsbIn(); // Nouvelle fonction pour gérer l'insertion
    } else {
      this.isOverZone = false;
      this.dragPosition = { x: 0, y: 0 };
    }
  }
  plugUsbIn() {
    this.isOverZone = false;
    this.showUsb = false; // On cache la clé draggable
    this.isPlugged = true; // On affiche la clé fixe sur la tour
    this.cdr.detectChanges();

    // On lance le boot après un petit délai réaliste
    setTimeout(() => {
      this.startBootSequence();
    }, 500);
  }

  checkCollision(point: { x: number; y: number }): boolean {
    if (!this.pcDropZone) return false;
    const rect = this.pcDropZone.nativeElement.getBoundingClientRect();
    const margin = 100;
    return (
      point.x >= rect.left - margin &&
      point.x <= rect.right + margin &&
      point.y >= rect.top - margin &&
      point.y <= rect.bottom + margin
    );
  }

  // --- BOOT AUTOMATIQUE ---
  startBootSequence() {
    this.showUsb = false;
    this.currentState = 'booting';
    this.bootLogs = [];
    this.cdr.detectChanges();

    let i = 0;
    const interval = setInterval(() => {
      if (i < this.biosLines.length) {
        this.bootLogs.push(this.biosLines[i]);
        i++;
        this.cdr.detectChanges();
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.currentState = 'terminal';
          this.currentTypedText = '> ';
          this.cdr.detectChanges();
        }, 800);
      }
    }, 500);
  }

  @HostListener('document:keydown', ['$event'])
  @HostListener('document:click', ['$event'])
  handleInteraction(event: Event) {
    if (this.currentState === 'terminal') {
      // Bloque le comportement par défaut (ex: espace qui scroll)
      if (event instanceof KeyboardEvent) event.preventDefault();

      this.typeNextChar();
    }
  }

  typeNextChar() {
    if (this.charIndex < this.fullCommand.length) {
      // Ajoute le caractère suivant
      this.currentTypedText += this.fullCommand.charAt(this.charIndex);
      this.charIndex++;
      this.cdr.detectChanges();

      // Scroll automatique vers le bas
      const term = document.querySelector('.terminal');
      if (term) term.scrollTop = term.scrollHeight;

      // Si on a fini la commande, on passe en mode auto
      if (this.charIndex >= this.fullCommand.length) {
        setTimeout(() => {
          this.autoTypeCommand();
        }, 500);
      }
    }
  }

  autoTypeCommand() {
    // Écrit le code tout seul, caractère par caractère
    const typingInterval = setInterval(() => {
      // On ajoute 2 caractères par frame pour aller vite
      for (let k = 0; k < 2; k++) {
        if (this.charIndex < this.fullCommand.length) {
          this.currentTypedText += this.fullCommand.charAt(this.charIndex);
          this.charIndex++;
        }
      }
      this.cdr.detectChanges(); // Mise à jour écran

      // Scroll automatique vers le bas
      const term = document.querySelector('.terminal');
      if (term) term.scrollTop = term.scrollHeight;

      // Fin de l'écriture ?
      if (this.charIndex >= this.fullCommand.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          this.currentState = 'success';
          this.cdr.detectChanges();
        }, 800);
      }
    }, 30); // Vitesse de frappe (30ms)
  }

  // --- GESTION DU RAPPORT ---

  scrollToDossier() {
    this.showReport = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      const element = document.querySelector('.nird-dossier');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  restart() {
    this.showUsb = true;
    this.currentState = 'windows';
    this.isPlugged = false;
    this.currentTypedText = '';
    this.charIndex = 0;
    this.dragPosition = { x: 0, y: 0 };
    this.bootLogs = [];
    this.showReport = false;
    this.ngOnInit();
  }

  accueil() {
    window.location.href = '/';
  }
}
