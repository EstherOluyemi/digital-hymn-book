import { Component, inject } from '@angular/core';
import { HymnService } from '../../../core/services/hymn';
import { Hymn } from '../../../core/models/hymn.model';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../../core/services/favorites';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterLink],
  selector: 'app-hymn-library',
  styleUrl: './hymn-library.css',
  templateUrl: './hymn-library.html',
})
export class HymnLibrary {
  private hymnService = inject(HymnService);
  private favoriteService = inject(FavoritesService);
  private searchSubject = new Subject<string>();

  searchTerm = '';
  selectedCategory = '';
  sortOption = 'number'

  categories: string[] = this.hymnService.getCategories();

  hymns: Hymn[] = this.hymnService.getHymns();
  filteredHymns: Hymn[] = this.hymnService.getHymns();

  applyFilters() {
  this.filteredHymns = this.hymns.filter(hymn => {

    const matchesSearch =
      hymn.title.toLowerCase().includes(this.searchTerm) ||
      hymn.author.toLowerCase().includes(this.searchTerm) ||
      hymn.number.toString().includes(this.searchTerm) ||
      hymn.verses.some(verse =>
        verse.toLowerCase().includes(this.searchTerm)
      );

    const matchesCategory =
      this.selectedCategory === '' ||
      hymn.category === this.selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (this.sortOption === 'number') {
  this.filteredHymns.sort((a, b) => a.number - b.number);
}

if (this.sortOption === 'title') {
  this.filteredHymns.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}

  }

  constructor(){
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.applyFilters();
    });
  }
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value.toLowerCase());

  }

  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;

    this.selectedCategory = select.value;

    this.applyFilters();
  }

  onSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sortOption = select.value;
    this.applyFilters();
  }

  isFavorite(id: number): boolean {
    return this.favoriteService.isFavorite(id);
  }

  toggleFavorite(hymn: Hymn) {
    if(this.favoriteService.isFavorite(hymn.id)) {
      this.favoriteService.removeFavorites(hymn.id);
    }
    else{ 
      this.favoriteService.addFavorites(hymn);
    }
  }
}
