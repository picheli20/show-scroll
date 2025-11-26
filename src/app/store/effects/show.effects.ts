import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ShowApiService } from 'src/app/services/http/show-api.service';
import { appInit } from '../actions/page.actions';
import { setShows } from '../actions/show.actions';

@Injectable()
export class ShowEffects {
  private actions$ = inject(Actions);
  private showApiService = inject(ShowApiService);

  loadShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appInit),
      switchMap(() => this.showApiService.load()),
      map(show => setShows(show)),
    )
  )
}
