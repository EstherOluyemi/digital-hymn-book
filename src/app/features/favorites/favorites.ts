import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites';

@Component({
  imports: [RouterLink],
  selector: 'app-favorites',
  styleUrl: './favorites.css',
  templateUrl: './favorites.html',
})
export class Favorites {
  private favouritesService = inject(FavoritesService);

  get favoriteHymns(){
    return this.favouritesService.getFavorites();
  }

  removeFavorites(id: number) {
    this.favouritesService.removeFavorites(id);
  }
}
