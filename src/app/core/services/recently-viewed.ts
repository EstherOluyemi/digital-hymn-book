import { inject, Injectable, signal } from "@angular/core";
import { Hymn } from "../models/hymn.model";
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auth } from './auth';

interface RecentlyViewedRecord {
  id: string;
  hymn: {
    id: string;
    number: number;
    title: string;
    category: string;
    author: string;
  };
  viewedAt: string;
}

interface RecentlyViewedListResponse {
  success: boolean;
  data: RecentlyViewedRecord[];
}

interface RecordViewResponse {
  success: boolean;
  message: string;
  data: RecentlyViewedRecord;
}


@Injectable({
  providedIn: 'root'
})
export class RecentlyViewedService {
    private readonly http = inject(HttpClient);
        private readonly auth = inject(Auth);

        private readonly apiUrl =
        `${environment.apiUrl}/users/me/recently-viewed`;

        fetchRecentlyViewed(): Observable<RecentlyViewedListResponse> {
        return this.http.get<RecentlyViewedListResponse>(this.apiUrl);
        }

        recordViewedHymn(
        hymnNumber: number
        ): Observable<RecordViewResponse> {
        return this.auth.getCsrfToken().pipe(
            switchMap(({ data }) =>
            this.http.post<RecordViewResponse>(
                `${this.apiUrl}/${hymnNumber}`,
                {},
                {
                headers: {
                    'X-CSRF-Token': data.csrfToken
                }
                }
            )
            )
        );
        }
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