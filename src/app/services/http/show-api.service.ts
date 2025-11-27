import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { SearchShow } from 'src/app/interfaces/search-show.interface';
import { Show } from 'src/app/interfaces/show.interface';
import { getShows } from 'src/app/store/selectors/show.selector';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShowApiService {
  private readonly apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private store = inject(Store);

  load() {
    return this.http.get<Show[]>(`${this.apiUrl}/shows`);
  }

  search(q: string) {
    return this.http.get<SearchShow[]>(`${this.apiUrl}/search/shows?q=${q}`);
  }

  detail(id: string) {
    const shows = this.store.selectSignal(getShows)();
    const detailShow = shows.find(item => `${item.id}` === `${id}`);

    if (detailShow) {
      return of(detailShow);
    }

    return this.http.get<Show>(`${this.apiUrl}/shows/${id}`);
  }
}
