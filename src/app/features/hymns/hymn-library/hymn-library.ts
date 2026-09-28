import { Component, inject } from '@angular/core';
import { HymnService } from '../../../core/services/hymn';
import { Hymn } from '../../../core/models/hymn.model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-hymn-library',
  styleUrl: './hymn-library.css',
  templateUrl: './hymn-library.html',
})
export class HymnLibrary {
  private hymnService = inject(HymnService);
  searchTerm = '';
  selectedCategory = '';

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

  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();

    this.applyFilters();
  }

  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;

    this.selectedCategory = select.value;

    this.applyFilters();
  }

}
