import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hymn } from '../models/hymn.model';
import { FavoritesResponse, FavoriteRecord } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { tap, switchMap } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private authService = inject(AuthService);

  private favoriteHymns = signal<Hymn[]>(
    this.loadFavorites()
  );
  private readonly _backendFavorites = signal<FavoriteRecord[]>([]);

  readonly backendFavorites = this._backendFavorites.asReadonly();

  getFavorites(): Hymn[] {
    return this.favoriteHymns();
  }

  isFavorite(id: number): boolean {
    return this.favoriteHymns()
      .some(hymn => hymn.id === id);
  }

  addFavorites(hymn: Hymn) {
    const alreadyFavorite = this.favoriteHymns()
      .some(favorite => favorite.id === hymn.id);

    if (!alreadyFavorite) {
      this.favoriteHymns.update(favorites => [
        ...favorites,
        hymn
      ]);

      this.saveFavorites();
    }
  }

  removeFavorites(id: number) {
    this.favoriteHymns.update(favorites =>
      favorites.filter(hymn => hymn.id !== id)
    );

    this.saveFavorites();
  }

  private saveFavorites() {
    localStorage.setItem(
      'favoriteHymns',
      JSON.stringify(this.favoriteHymns())
    );
  }

  private loadFavorites(): Hymn[] {
    const savedFavorites = localStorage.getItem('favoriteHymns');

    return savedFavorites
      ? JSON.parse(savedFavorites)
      : [];
  }

  // BACKEND API
  getUserFavorites() {
    return this.http.get<FavoritesResponse>(
        `${this.apiUrl}/users/me/favorites`
    ).pipe(
        tap(response => {
        this._backendFavorites.set(response.data);
        })
    );
    }

    removeUserFavorite(hymnId: string) {
    return this.http.delete(
      `${this.apiUrl}/users/me/favorites/${hymnId}`
    );
  }
}
