import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HymnService } from '../../../core/services/hymn';
import { Hymn } from '../../../core/models/hymn.model';

@Component({
  imports: [RouterLink],
  selector: 'app-category-hymns',
  styleUrl: './category-hymns.css',
  templateUrl: './category-hymns.html',
})
export class CategoryHymns {
  private route = inject(ActivatedRoute);
  private hymnService = inject(HymnService);

  category = '';
  hymns: Hymn[] = [];
  filteredHymns: Hymn[] = [];
  searchTerm = '';
  sortOption = 'number';

  constructor() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') ?? '';
      this.hymns = this.hymnService.getHymnsByCategory(this.category);
      this.filteredHymns = [...this.hymns];
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.applyFilters();
  }

  onSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sortOption = select.value;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredHymns = this.hymns.filter(hymn =>
      hymn.title.toLowerCase().includes(this.searchTerm) ||
      hymn.author.toLowerCase().includes(this.searchTerm) ||
      hymn.number.toString().includes(this.searchTerm)
    );

    if (this.sortOption === 'number') {
      this.filteredHymns.sort((a, b) => a.number - b.number);
    }

    if (this.sortOption === 'title') {
      this.filteredHymns.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }
  }
}