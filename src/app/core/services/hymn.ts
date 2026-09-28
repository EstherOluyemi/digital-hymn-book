import { Injectable } from '@angular/core';
import { Hymn } from '../models/hymn.model';
import { HYMNS } from '../data/hymn.data';

@Injectable({ providedIn: 'root' })
export class HymnService {
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
        return['Worship', 'Praise', 'Prayer'];
    }
    getHymnsByCategory(category: string): Hymn[] {
        return HYMNS.filter(hymn => hymn.category === category);
    }

    getHymnOfTheDay(): Hymn {
        return HYMNS[0];
    }
}
 