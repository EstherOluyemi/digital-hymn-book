import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HymnService } from '../../core/services/hymn';
import { Hymn } from '../../core/models/hymn.model';
import { RecentlyViewedService } from '../../core/services/recently-viewed';
import { FavoritesService } from '../../core/services/favorites';


@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private hymnService = inject(HymnService);
  private recentlyViewedService = inject(RecentlyViewedService);
  private favoriteService = inject(FavoritesService);

  hymnOfTheDay: Hymn = this.hymnService.getHymnOfTheDay();

  categories: string[] = this.hymnService.getCategories();

  get recentlyViewed() {
    return this.recentlyViewedService.getRecentlyViewed();
  }

  get FavoriteHymns(){
    return this.favoriteService.getFavorites();
  }
}
