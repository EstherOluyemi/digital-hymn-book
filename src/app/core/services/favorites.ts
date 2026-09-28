import { Injectable, signal } from '@angular/core';
import { Hymn } from '../models/hymn.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
    private favoriteHymns = signal<Hymn[]>(
        this.loadFavorites()
    );

    getFavorites(): Hymn[]{
        return this.favoriteHymns();
    }

    addFavorites(hymn: Hymn){
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

    private saveFavorites(){
        localStorage.setItem(
            'favoriteHymns',
            JSON.stringify(this.favoriteHymns())
        );
    }

    private loadFavorites(): Hymn[]{
        const savedFavorites = localStorage.getItem('favoriteHymns');

        return savedFavorites
        ?JSON.parse(savedFavorites)
        : [];
    }
}