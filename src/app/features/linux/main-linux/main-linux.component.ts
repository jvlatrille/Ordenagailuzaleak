import { Component, ElementRef, HostListener, ViewChild, ChangeDetectorRef } from '@angular/core';
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

  currentState: 'bsod' | 'terminal' | 'success' | 'booting' = 'bsod';
  showUsb = true;
  isDragging = false;
  isOverZone = false;
  dragPosition = { x: 0, y: 0 };

  // NOUVEAU : Le rapport est caché par défaut
  showReport = false;

  bootLogs: string[] = [];
  biosLines = [
    'AMIBIOS (C) 2005 American Megatrends, Inc.',
    'BIOS Date: 10/22/2005 15:22:11 Ver: 08.00.12',
    'CPU : Intel Pentium 4 @ 2.40GHz',
    'Checking NVRAM.. OK',
    '512MB RAM DETECTED',
    'USB Device Found : LINUX DRIVE',
    'Loading Kernel...',
    'Booting from USB Device...',
  ];

  fullCommand =
    'sudo install-linux --save-planet\n> Formatting Windows...\n> Installing Linux Mint...\n> Drivers loaded.\n> System is ready.';
  currentTypedText = '';
  charIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {}

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
      this.isOverZone = false;
      this.startBootSequence();
    } else {
      this.isOverZone = false;
      this.dragPosition = { x: 0, y: 0 };
    }
  }

  checkCollision(point: { x: number; y: number }): boolean {
    if (!this.pcDropZone) return false;
    const rect = this.pcDropZone.nativeElement.getBoundingClientRect();
    const margin = 60; // Marge augmentée pour mobile
    return (
      point.x >= rect.left - margin &&
      point.x <= rect.right + margin &&
      point.y >= rect.top - margin &&
      point.y <= rect.bottom + margin
    );
  }

  startBootSequence() {
    this.showUsb = false; // La clé disparait (elle est dans le PC)
    this.currentState = 'booting';
    this.bootLogs = []; // On reset les logs pour éviter les doublons
    this.cdr.detectChanges(); // On force l'affichage immédiat

    let i = 0;

    // On lance une boucle qui s'exécute toutes les 600ms
    const interval = setInterval(() => {
      if (i < this.biosLines.length) {
        // On ajoute la ligne suivante
        this.bootLogs.push(this.biosLines[i]);
        i++;
        this.cdr.detectChanges(); // IMPORTANT : Force l'écran à afficher la nouvelle ligne
      } else {
        // C'est fini, on passe au terminal
        clearInterval(interval);
        setTimeout(() => {
          this.currentState = 'terminal';
          this.currentTypedText = '> ';
          this.cdr.detectChanges();
        }, 1000); // Petite pause d'1 seconde avant de donner la main
      }
    }, 600); // Vitesse du défilement
  }

  @HostListener('document:keydown', ['$event'])
  @HostListener('document:click', ['$event'])
  handleInteraction(event: Event) {
    if (this.currentState === 'terminal') {
      if (event instanceof KeyboardEvent) event.preventDefault();
      this.typeNextChar();
    }
  }

  typeNextChar() {
    const speed = 4; // Plus rapide
    for (let k = 0; k < speed; k++) {
      if (this.charIndex < this.fullCommand.length) {
        this.currentTypedText += this.fullCommand.charAt(this.charIndex);
        this.charIndex++;
      }
    }

    // Scroll auto du terminal
    setTimeout(() => {
      const term = document.querySelector('.terminal');
      if (term) term.scrollTop = term.scrollHeight;
    }, 0);

    if (this.charIndex >= this.fullCommand.length) {
      setTimeout(() => {
        this.currentState = 'success';
      }, 500);
    }
  }

  // MODIFIÉ : Affiche le rapport puis scroll
  scrollToDossier() {
    this.showReport = true; // 1. On révèle la section
    this.cdr.detectChanges(); // 2. On force Angular à l'afficher dans le DOM

    // 3. On attend un micro-instant que le DOM existe, puis on scroll
    setTimeout(() => {
      const element = document.querySelector('.nird-dossier');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  restart() {
    this.showUsb = true;
    this.currentState = 'bsod';
    this.currentTypedText = '';
    this.charIndex = 0;
    this.dragPosition = { x: 0, y: 0 };
    this.bootLogs = [];
    this.showReport = false; // On recache le rapport
  }

  accueil() {
    window.location.href = '/';
  }
}
