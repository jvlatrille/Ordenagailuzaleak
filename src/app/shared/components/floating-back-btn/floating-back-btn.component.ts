import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-floating-back-btn',
  standalone: true,
  imports: [RouterModule],
  template: `
    <button class="floating-back-btn" [routerLink]="link" title="Retour à l'accueil">
      <i class="bi bi-arrow-left"></i>
    </button>
  `,
  styles: [`
    .floating-back-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-primary) 0%, #166d0f 100%);
      color: white;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(30, 120, 18, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 999;
      animation: slideInUp 0.6s ease-out;
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .floating-back-btn:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 25px rgba(30, 120, 18, 0.4);
    }

    .floating-back-btn:active {
      transform: translateY(-4px);
    }

    @media (max-width: 768px) {
      .floating-back-btn {
        width: 50px;
        height: 50px;
        bottom: 20px;
        right: 20px;
        font-size: 20px;
      }
    }
  `]
})
export class FloatingBackBtnComponent {
  @Input() link: string = '/home';
}
