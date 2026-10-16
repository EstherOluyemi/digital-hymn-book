import { Injectable, inject } from '@angular/core';
import { Hymn } from '../models/hymn.model';
import { HYMNS } from '../data/hymn.data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HymnsResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class HymnService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    getHymns(): Hymn[]{
        return HYMNS;
    }
    getHymnById(id: number): Hymn | undefined{
        return HYMNS.find(hymn => hymn.id === id)
    }
    getPreviousHymn(id: number): Hymn | undefined{
        const currentIndex = HYMNS.findIndex(hymn => hymn.id === id);

        if (currentIndex <= 0){
            return undefined;
        }
        return HYMNS[currentIndex -1];
    }

    getNextHymn(id: number): Hymn | undefined{
        const currentIndex  = HYMNS.findIndex(hymn => hymn.id === id);

        if(currentIndex === -1 || currentIndex === HYMNS.length - 1){
            return undefined;
        }
        return HYMNS[currentIndex + 1];
    }

    getCategories(): string[] {
        return[
            'Praise',
            'Worship',
            'Grace',
            'Faith',
            'Prayer',
            'Thanksgiving',
            'Christmas',
            'Easter'
        ];
    }
    getHymnsByCategory(category: string): Hymn[] {
        return HYMNS.filter(hymn => hymn.category === category);
    }

    getHymnOfTheDay(): Hymn {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 0);

        const difference = today.getTime() - startOfYear.getTime();
        const dayOfYear = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hymnIndex = dayOfYear % HYMNS.length;

        return HYMNS[hymnIndex];
    }

    getBackendHymns() {
        return this.http.get<HymnsResponse>(
            `${this.apiUrl}/hymns`
        );
    }
}
 