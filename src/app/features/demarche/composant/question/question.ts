import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.html',
  styleUrls: ['./question.css'],
})
export class QuestionComponent implements OnChanges {

  @Input() question: string | undefined;
  @Input() reponses: string[] = [];
  @Input() responseCorresctIndex: number | undefined;

  @Input() revealAnswers: boolean = false;
  @Input() answerStates: ('correct' | 'wrong' | 'neutral')[] | undefined;

  // Input from parent to help us sync visual state
  @Input() currentSelection: string | null = null;

  @Output() reponseSelected: EventEmitter<string> = new EventEmitter<string>();

  // Backwards-compatible method used by the existing template
  selectedReponse: string | null = null;

  onSelect(reponse: string) {
    if (this.revealAnswers) return; // Prevent changing answer during reveal
    this.reponseSelected.emit(reponse);
  }

  onReponseSelected(reponse: string) {
    if (this.revealAnswers) return;
    this.selectedReponse = reponse;
    this.reponseSelected.emit(reponse);
  }

  // Keep selectedReponse in sync with parent-provided `currentSelection`
  ngOnChanges(changes: SimpleChanges) {
    // When the parent updates the current selection, reflect it locally
    if (changes['currentSelection']) {
      this.selectedReponse = this.currentSelection;
    }

    // If the question changed and parent reset selection to null, clear local
    if (changes['question'] && this.currentSelection === null) {
      this.selectedReponse = null;
    }
  }
}