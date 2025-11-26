import { createAction } from '@ngrx/store';
import { Show } from 'src/app/interfaces/show.interface';

export const setShowLoading = createAction('[Show] Loading', (isLoading: boolean) => ({ isLoading }));
export const setShows = createAction('[Show] Set Shows', (shows: Show[]) => ({ shows }));
