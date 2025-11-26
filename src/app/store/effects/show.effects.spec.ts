import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { ShowApiService } from 'src/app/services/http/show-api.service';
import { appInit } from '../actions/page.actions';
import { setShows } from '../actions/show.actions';
import { ShowEffects } from './show.effects';

describe('ShowEffects', () => {
  let actions$: Observable<any>;
  let effects: ShowEffects;
  let showApiServiceSpy: any;

  beforeEach(() => {
    const apiSpy = {
      load: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ShowEffects,
        provideMockActions(() => actions$),
        { provide: ShowApiService, useValue: apiSpy }
      ]
    });

    effects = TestBed.inject(ShowEffects);
    showApiServiceSpy = TestBed.inject(ShowApiService);
  });

  it('should load shows on appInit', (done) => {
    const mockShows = [{ id: 1, name: 'Show 1' }];
    actions$ = of(appInit());
    showApiServiceSpy.load.mockReturnValue(of(mockShows as any));

    effects.loadShow$.subscribe(action => {
      expect(action).toEqual(setShows(mockShows as any));
      done();
    });
  });
});
