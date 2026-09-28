import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HymnService } from '../../../core/services/hymn';
import { Hymn } from '../../../core/models/hymn.model';
import { HttpParams } from '@angular/common/http';

@Component({
  imports: [RouterLink],
  selector: 'app-hymn-details',
  styleUrl: './hymn-details.css',
  templateUrl: './hymn-details.html',
})
export class HymnDetails {
  private route = inject(ActivatedRoute);
  private hymnService = inject(HymnService);

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
    });
  }
}
