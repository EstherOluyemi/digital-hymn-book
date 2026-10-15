
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FavoritesService } from '../../core/services/favorites';

@Component({
  imports: [RouterLink],
  selector: 'app-favorites',
  styleUrl: './favorites.css',
  templateUrl: './favorites.html',
})
export class Favorites implements OnInit {
  private favouritesService = inject(FavoritesService);
  readonly backendFavorites = this.favouritesService.backendFavorites;

  get favoriteHymns() {
    return this.favouritesService.getFavorites();
  }

  removeFavorites(id: number) {
    this.favouritesService.removeFavorites(id);
  }

  ngOnInit() {
    this.favouritesService.getUserFavorites().subscribe({
      next: (response) => {
        console.log('Backend favorites:', response.data);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to fetch favorites:', error);
      }
    });
  }
}
