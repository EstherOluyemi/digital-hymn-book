import { inject, Injectable, signal } from "@angular/core";
import { Hymn } from "../models/hymn.model";

@Injectable({
  providedIn: 'root'
})
export class RecentlyViewedService {
    private recentlyViewedHymns = signal<Hymn[]>(
        this.loadRecentlyViewed()
    );

    getRecentlyViewed(): Hymn[] {
        return this.recentlyViewedHymns();
    }

    addRecentlyViewed(hymn: Hymn) {
        const withoutCurrentHymn = this.recentlyViewedHymns()
        .filter(viewedHymn => viewedHymn.id !== hymn.id);

        this.recentlyViewedHymns.set([
            hymn,
            ...withoutCurrentHymn
        ]);

        this.saveRecentlyViewed();
    }

    private saveRecentlyViewed(){
        localStorage.setItem(
            'recentlyViewed',
            JSON.stringify(this.recentlyViewedHymns())
        );
    }

    private loadRecentlyViewed(): Hymn[] {
        const saved = localStorage.getItem('recentlyViewed');

        return saved 
        ? JSON.parse(saved)
        : [];
    }
}