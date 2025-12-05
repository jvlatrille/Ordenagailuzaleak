import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FloatingBackBtnComponent } from '../../../shared/components/floating-back-btn/floating-back-btn.component';

interface Commentaire {
  auteur: string;
  contenu: string;
  date: string | Date;
}

interface Post {
  id: string; // ID en string pour json-server
  titre: string;
  auteur: string;
  contenu: string;
  date: string | Date;
  commentaires: Commentaire[];
  showComments?: boolean; // Optionnel car non stocké en BDD
}

@Component({
  selector: 'app-main-reseau-etablissement',
  standalone: true,
  imports: [CommonModule, FormsModule, FloatingBackBtnComponent],
  templateUrl: './main-reseau-etablissement.component.html',
  styleUrl: './main-reseau-etablissement.component.css'
})
export class MainReseauEtablissementComponent implements OnInit {
  
  private http = inject(HttpClient);
  private cd = inject(ChangeDetectorRef);
  
  // URL du json-server (Attention, il faut avoir lancé la commande npx json-server ...)
  private apiUrl = 'http://localhost:3000/posts';

  posts: Post[] = [];
  isFormOpen = false;

  nouveauTitre = '';
  nouveauContenu = '';
  nouvelAuteur = '';

  ngOnInit() {
    this.chargerPosts();
  }

  chargerPosts() {
    this.http.get<Post[]>(this.apiUrl).subscribe({
      next: (data) => {
        // On trie pour avoir les plus récents en haut (si le serveur ne le fait pas)
        this.posts = data.reverse().map(post => ({
          ...post,
          showComments: true // On ouvre tout par défaut
        }));
        this.cd.detectChanges();
      },
      error: (err) => console.error('Erreur chargement. Avez-vous lancé json-server ?', err)
    });
  }

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
  }

  ajouterPost() {
    if (this.nouveauTitre && this.nouveauContenu && this.nouvelAuteur) {
      
      const newPost = {
        // id: json-server le génère automatiquement !
        titre: this.nouveauTitre,
        contenu: this.nouveauContenu,
        auteur: this.nouvelAuteur,
        date: new Date().toISOString(), // Format compatible JSON
        commentaires: []
      };

      // Envoi au serveur (POST)
      this.http.post<Post>(this.apiUrl, newPost).subscribe({
        next: (postCree) => {
          // On l'ajoute visuellement en haut de la liste
          this.posts.unshift({ ...postCree, showComments: true });
          
          // Reset formulaire
          this.nouveauTitre = '';
          this.nouveauContenu = '';
          this.nouvelAuteur = '';
          this.isFormOpen = false;
          
          this.cd.detectChanges();
        },
        error: (err) => console.error("Erreur lors de l'envoi", err)
      });
    }
  }

  ajouterCommentaire(post: Post, auteur: string, contenu: string) {
    if (auteur && contenu) {
      const nouveauCom: Commentaire = {
        auteur: auteur,
        contenu: contenu,
        date: new Date().toISOString()
      };

      // On met à jour la liste locale d'abord (pour la réactivité)
      const commentairesMisAJour = [...post.commentaires, nouveauCom];
      post.commentaires = commentairesMisAJour;

      // On sauvegarde la modification sur le serveur (PATCH)
      // On met à jour uniquement le champ "commentaires" du post concerné
      this.http.patch(`${this.apiUrl}/${post.id}`, { commentaires: commentairesMisAJour }).subscribe({
        next: () => console.log('Commentaire sauvegardé !'),
        error: (err) => console.error('Erreur sauvegarde commentaire', err)
      });
    }
  }

  toggleComments(post: Post) {
    post.showComments = !post.showComments;
  }
}