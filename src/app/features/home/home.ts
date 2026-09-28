import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HymnService } from '../../core/services/hymn';
import { Hymn } from '../../core/models/hymn.model';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private hymnService = inject(HymnService);

  hymnOfTheDay: Hymn = this.hymnService.getHymnOfTheDay();

  categories: string[] = this.hymnService.getCategories();
}
