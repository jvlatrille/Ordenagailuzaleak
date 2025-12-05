import { Component, ElementRef, HostListener, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

// --- Interfaces ---
// On ajoute une propriété facultative 'img' pour stocker la référence à l'image chargée
interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  img?: HTMLImageElement; 
}

@Component({
  selector: 'app-space-invader',
  template: `
    <div class="game-wrapper">
      <div class="hud" [hidden]="gameState === 'WAITING'">
        <span>SCORE: {{ score }}</span>
        <span>VITESSE: x{{ difficultyMultiplier }}</span>
      </div>
      
      <canvas #gameCanvas width="600" height="500" [hidden]="gameState === 'WAITING'"></canvas>

      @if(gameState === 'WAITING') {
        <div class="overlay">
          <h1 class="start">SPACE INVADER</h1>
          <p>Appuyez sur <strong>ENTRÉE</strong> pour commencer</p>
        </div>
      }

      @if(gameState === 'GAME_OVER') {
        <div class="overlay">
          <h1 class="lose">GAME OVER</h1>
          <p>Score final : {{ score }}</p>
          <p>Appuyez sur <strong>ENTRÉE</strong> pour rejouer</p>
        </div>
      }

      <p style="color:var(--bs-light);">Utilisez les flèches gauche/droite pour déplacer le vaisseau. Appuyez sur ESPACE pour tirer.</p>
      
    </div>
  `,
  styles: [`
    .game-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #343a40;
      padding: 20px;
      font-family: 'Verdana', sans-serif;
      min-height: 600px; /* Pour éviter le saut pendant le chargement */
    }
    .loading { color: yellow; font-size: 24px; margin-top: 200px; }
    canvas {
      background: linear-gradient(to bottom, #343a40, var(--bs-primary)); /* Fond spatial simple */
      border: 2px solid #555;
      box-shadow: 0 0 20px rgba(0, 100, 255, 0.2);
    }
    .hud {
      width: 600px;
      display: flex;
      justify-content: space-between;
      color: white;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .overlay {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      background: rgba(0,0,0,0.85);
      padding: 30px 50px;
      border: 1px solid white;
      border-radius: 8px;
      color: white;
    }
    h1.lose { color: #ff4444; font-size: 3em; margin: 0; }
    h1.start { color: #00ff00; font-size: 3em; margin: 0; }
  `]
})
export class SpaceInvader implements AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationId: number = 0;

  // --- URLs des Sprites ---
  // REMPLACEZ CES URLS PAR VOS IMAGES LOCALES (ex: 'assets/ship.png')
  // J'utilise des placeholders fiables pour l'exemple.
  readonly PLAYER_IMG_URL = 'spaceInvader/player.png'; // Un vaisseau bleu
  readonly ENEMY_AMAZON_IMG_URL = 'spaceInvader/amazon.png';  // Un alien vert
  readonly ENEMY_CHROME_IMG_URL = 'spaceInvader/chrome.png';  // Un alien vert
  readonly ENEMY_WINDOWS_IMG_URL = 'spaceInvader/windows.png';  // Un alien vert
  readonly ENEMY_WORD_IMG_URL = 'spaceInvader/word.png';  // Un alien vert

  // --- Assets chargés ---
  playerSprite!: HTMLImageElement;
  enemySprite!: HTMLImageElement;
  enemyAmazonSprite!: HTMLImageElement;
  enemyChromeSprite!: HTMLImageElement;
  enemyWindowsSprite!: HTMLImageElement;
  enemyWordSprite!: HTMLImageElement;
  ennemiesSprites!: HTMLImageElement[];

  // --- État du jeu ---
  gameState: 'WAITING' | 'PLAYING' | 'GAME_OVER' = 'WAITING';
  score = 0;
  canvasWidth = 600;
  canvasHeight = 500;
  
  // --- Paramètres de difficulté progressive ---
  baseEnemySpeed = 0.8; // Vitesse de chute de base (pixels par frame) - réduite pour un début plus lent
  difficultyMultiplier = 1.0; // Augmente avec le temps
  elapsedTime = 0; // Temps écoulé depuis le début du jeu (en secondes)
  nextSpawnTime = 1.0; // Temps avant le prochain spawn

  // --- Entités ---
  player!: GameObject;
  bullets: GameObject[] = [];
  enemies: GameObject[] = [];
  
  // --- Contrôles ---
  keys: { [key: string]: boolean } = {};

  // --- Delta Time (pour indépendance du framerate) ---
  private lastFrameTime: number = 0;
  private deltaTime: number = 0;

  async ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    
    // --- Charger les images ---
    try {
      [this.playerSprite, this.enemyAmazonSprite, this.enemyChromeSprite, this.enemyWindowsSprite, this.enemyWordSprite] = await Promise.all([
        this.loadImage(this.PLAYER_IMG_URL),
        this.loadImage(this.ENEMY_AMAZON_IMG_URL),
        this.loadImage(this.ENEMY_CHROME_IMG_URL),
        this.loadImage(this.ENEMY_WINDOWS_IMG_URL),
        this.loadImage(this.ENEMY_WORD_IMG_URL)
      ]);
      this.ennemiesSprites = [
        this.enemyAmazonSprite,
        this.enemyChromeSprite,
        this.enemyWindowsSprite,
        this.enemyWordSprite
      ];
      
      console.log('Sprites chargés avec succès !');
      // Ne pas démarrer le jeu, rester sur l'écran d'accueil
      this.gameLoop();

    } catch (error) {
      console.error("Erreur critique au chargement des images", error);
    }
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }

  // --- Utilitaire de chargement d'image (Promise wrapper) ---
  loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
    });
  }

  initGame() {
    this.score = 0;
    this.gameState = 'PLAYING';
    this.bullets = [];
    this.enemies = [];
    this.difficultyMultiplier = 1.0;
    this.elapsedTime = 0; // Réinitialiser le temps écoulé
    
    // Initialiser le joueur avec son image
    const playerWidth = 50;
    const playerHeight = 50;
    this.player = {
      x: this.canvasWidth / 2 - playerWidth / 2,
      y: this.canvasHeight - playerHeight - 10,
      width: playerWidth,
      height: playerHeight,
      img: this.playerSprite // On attache l'image chargée
    };
  }

  gameLoop = () => {
    if (this.gameState === 'PLAYING') {
      const currentTime = performance.now();
      if (this.lastFrameTime === 0) this.lastFrameTime = currentTime;
      this.deltaTime = (currentTime - this.lastFrameTime) / 1000; // Convertir en secondes
      this.lastFrameTime = currentTime;

      this.update();
      this.draw();
    }
    this.animationId = requestAnimationFrame(this.gameLoop);
  }

  // --- Logique du jeu ---
  update() {
    // 0. Accumuler le temps écoulé pour la progression de difficulté
    this.elapsedTime += this.deltaTime;
    
    // 1. Augmenter la difficulté de manière progressive et fluide
    // Formule: difficulté = 1 + (temps / 50) avec racine carrée pour une progression plus lente au début
    this.difficultyMultiplier = 1.0 + Math.exp(this.elapsedTime/20);

    // 2. Déplacement Joueur
    const speed = 300; // pixels par seconde
    if (this.keys['ArrowLeft'] && this.player.x > 0) this.player.x -= speed * this.deltaTime;
    if (this.keys['ArrowRight'] && this.player.x + this.player.width < this.canvasWidth) this.player.x += speed * this.deltaTime;

    // 3. Gestion des Balles
    this.bullets.forEach((b, i) => {
      b.y -= 400 * this.deltaTime; // pixels par seconde
      if (b.y + b.height < 0) this.bullets.splice(i, 1); // Supprimer hors écran
    });

    // 4. Gestion des Ennemis (Apparition et Descente)
    this.nextSpawnTime -= this.deltaTime;
    if (this.nextSpawnTime <= 0) {
        // Formule progressive pour le spawn: délai = 2.5 - (0.5 * sqrt(difficulté))
        // Cela rend le spawn plus rapide graduellement, avec un minimum de ~1.5s au début
        const spawnDelay = Math.max(0.3, 2.5 - (0.8 * Math.sqrt(this.difficultyMultiplier - 1)));
        this.nextSpawnTime = spawnDelay;
        
        const size = 50;
        this.enemies.push({
            x: Math.random() * (this.canvasWidth - size),
            y: -size, // Commence juste au-dessus de l'écran
            width: size,
            height: size,
            img: this.ennemiesSprites[Math.floor(Math.random() * this.ennemiesSprites.length)] // Choisir une image aléatoire
        });
    }

    // Déplacer les ennemis vers le bas avec une progression fluide
    // Formule: vitesse = vitesse_base * sqrt(difficulté) pour une progression progressive
    const currentSpeed = this.baseEnemySpeed * Math.sqrt(this.difficultyMultiplier);
    
    this.enemies.forEach((e, i) => {
      e.y += currentSpeed * 100 * this.deltaTime; // pixels par seconde

      // Game Over si un ennemi touche le bas de l'écran
      if (e.y > this.canvasHeight) {
          this.gameState = 'GAME_OVER';
      }

      // Collision avec le joueur
      if (this.checkCollision(e, this.player)) {
          this.gameState = 'GAME_OVER';
      }
    });

    // 5. Collisions Balle -> Ennemi
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        if (this.bullets[i] && this.enemies[j] && this.checkCollision(this.bullets[i], this.enemies[j])) {
          this.enemies.splice(j, 1); // Supprimer ennemi
          this.bullets.splice(i, 1); // Supprimer balle
          this.score += 10 * Math.floor(this.difficultyMultiplier); // Score augmente avec la difficulté
          // Le break est important car une balle ne tue qu'un ennemi
          break; 
        }
      }
    }
  }

  // --- Rendu Graphique (Canvas) ---
  draw() {
    // Effacer le canvas
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Dessiner le Joueur (Image)
    if (this.player.img) {
        // Syntaxe: drawImage(image, x, y, width, height)
        this.ctx.drawImage(this.player.img, this.player.x, this.player.y, this.player.width, this.player.height);
    }

    // Dessiner les Ennemis (Images)
    this.enemies.forEach(e => {
        if (e.img) {
            this.ctx.drawImage(e.img, e.x, e.y, e.width, e.height);
        }
    });

    // Dessiner Balles (Simple rectangles pour l'instant, pourrait aussi être des images)
    this.ctx.fillStyle = '#00fffa'; // Cyan néon
    this.bullets.forEach(b => {
        this.ctx.fillRect(b.x, b.y, b.width, b.height);
        // Ajout d'un petit effet de "lueur"
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#00fffa';
    });
     this.ctx.shadowBlur = 0; // Reset de l'effet
  }

  // Utilitaire de collision (AABB - Axis-Aligned Bounding Box)
  checkCollision(rect1: GameObject, rect2: GameObject): boolean {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  // --- Gestion des Entrées Clavier ---
  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    this.keys[e.key] = true;

    // Tirer (Espace)
    if (e.code === 'Space' && this.gameState === 'PLAYING') {
      // Cadence de tir simple: pas plus de 5 balles à l'écran
      if (this.bullets.length < 5) {
        this.bullets.push({
          x: this.player.x + this.player.width / 2 - 2, // Centrer le tir
          y: this.player.y,
          width: 4,
          height: 15
        });
      }
    }

    // Commencer (Entrée depuis WAITING) ou Rejouer (Entrée depuis GAME_OVER)
    if (e.code === 'Enter') {
      if (this.gameState === 'WAITING') {
        this.initGame();
        this.gameState = 'PLAYING';
      } else if (this.gameState === 'GAME_OVER') {
        this.initGame();
        this.gameState = 'PLAYING';
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(e: KeyboardEvent) {
    this.keys[e.key] = false;
  }
}