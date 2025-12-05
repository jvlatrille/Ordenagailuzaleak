import { Component, ElementRef, HostListener, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DragDropModule, CdkDragEnd } from '@angular/cdk/drag-drop';
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
  isDragging = false; // Pour illuminer la cible
  // Position de la clé (pour la remettre à sa place si on rate la cible)
  dragPosition = { x: 0, y: 0 };

  // Variables pour le démarrage (BIOS)
  bootLogs: string[] = [];
  biosLines = [
    'AMIBIOS (C) 2005 American Megatrends, Inc.',
    'BIOS Date: 10/22/2005 15:22:11 Ver: 08.00.12',
    'CPU : Intel Pentium 4 @ 2.40GHz',
    'Checking NVRAM..',
    '512MB RAM OK',
    'Detecting Primary Master ... IDE Hard Disk',
    'Detecting USB Device ... LINUX RESCUE DRIVE',
    'Booting from USB Device...',
  ];

  fullCommand =
    'sudo install-linux --save-planet\n> Formatting Windows...\n> Installing Linux Mint...\n> Drivers loaded.\n> System is ready.';
  currentTypedText = '';
  charIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  onDragStarted() {
    this.isDragging = true;
  }

  checkDrop(event: CdkDragEnd) {
    this.isDragging = false;
    //On récupère le rectangle de la zone cible (le PC)
    const pcRect = this.pcDropZone.nativeElement.getBoundingClientRect();

    // On récupère la position de la souris au moment du relâchement
    const { x, y } = event.dropPoint;

    //Est-ce que la souris est DANS le rectangle ?
    if (x >= pcRect.left && x <= pcRect.right && y >= pcRect.top && y <= pcRect.bottom) {
      if (this.currentState === 'bsod') {
        this.insertUsb();
      }
    } else {
      this.dragPosition = { x: 0, y: 0 };
    }
  }

  startBootSequence() {
    this.showUsb = false;
    this.currentState = 'booting';

    let i = 0;
    const interval = setInterval(() => {
      this.bootLogs.push(this.biosLines[i]);
      i++;
      if (i >= this.biosLines.length) {
        clearInterval(interval);
        setTimeout(() => {
          this.currentState = 'terminal';
          this.currentTypedText = '> ';
        }, 1000);
      }
    }, 600);
  }
  insertUsb() {
    this.showUsb = false;
    this.currentState = 'terminal';
    this.currentTypedText = '> ';
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.currentState === 'terminal') {
      event.preventDefault();
      this.typeNextChar();
    }
  }

  //Fonction pour taper le texte sur le terminal
  typeNextChar() {
    if (this.charIndex < this.fullCommand.length) {
      this.currentTypedText += this.fullCommand.charAt(this.charIndex);
      this.charIndex++;
    } else {
      setTimeout(() => {
        this.currentState = 'success';
      }, 1000);
    }
  }

  // Pour réinitialiser le composant
  restart() {
    this.showUsb = true;
    this.currentState = 'bsod';
    this.currentTypedText = '';
    this.charIndex = 0;
    this.dragPosition = { x: 0, y: 0 };
  }

  accueil() {
    window.location.href = '/';
  }
}
