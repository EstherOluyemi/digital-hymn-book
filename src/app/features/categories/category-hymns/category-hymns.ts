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

  constructor(){
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') ?? '';
      this.hymns = this.hymnService.getHymnsByCategory(this.category);
    });
  }
}
