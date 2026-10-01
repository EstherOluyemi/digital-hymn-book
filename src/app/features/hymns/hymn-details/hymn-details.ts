import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HymnService } from '../../../core/services/hymn';
import { Hymn } from '../../../core/models/hymn.model';
import { HttpParams } from '@angular/common/http';
import { FavoritesService } from '../../../core/services/favorites';
import { RecentlyViewedService } from '../../../core/services/recently-viewed';

@Component({
  imports: [RouterLink],
  selector: 'app-hymn-details',
  styleUrl: './hymn-details.css',
  templateUrl: './hymn-details.html',
})
export class HymnDetails {
  private route = inject(ActivatedRoute);
  private hymnService = inject(HymnService);
  private favouritesService = inject(FavoritesService);
  private recentlyViewedService = inject(RecentlyViewedService);

  private id = Number(this.route.snapshot.paramMap.get('id'));

  hymn: Hymn | undefined;
  previousHymn: Hymn | undefined;
  nextHymn: Hymn | undefined;

  constructor(){
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      this.hymn = this.hymnService.getHymnById(id);
      this.previousHymn = this.hymnService.getPreviousHymn(id);
      this.nextHymn = this.hymnService.getNextHymn(id);

      if(this.hymn){
        this.recentlyViewedService.addRecentlyViewed(this.hymn);
      }
    });
  }

  toggleFavorite() {
    if(!this.hymn) {
      return;
    }

    if(this.favouritesService.isFavorite(this.hymn.id)) {
      this.favouritesService.removeFavorites(this.hymn.id);
    }
    else{
      this.favouritesService.addFavorites(this.hymn);
    }
  }

  isFavorite(): boolean {
    if(!this.hymn) {
      return false;
    }

    return this.favouritesService.isFavorite(this.hymn.id);
  }
}
