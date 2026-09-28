import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HymnService } from '../../../core/services/hymn';

@Component({
  imports: [RouterLink],
  selector: 'app-categories',
  styleUrl: './categories.css',
  templateUrl: './categories.html',
})
export class Categories {
  private hymnService = inject(HymnService);

  categories: string[] = this.hymnService.getCategories();
}
