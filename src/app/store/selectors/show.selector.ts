import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShowState } from '../interfaces/show.interface';

export const selectShow = createFeatureSelector<ShowState>('show');

export const isShowLoading = createSelector(
  selectShow,
  (state) => state.isLoading,
);

export const getShowsByGenre = createSelector(
  selectShow,
  (state) => state.showsByGenre,
);

export const getShows = createSelector(
  selectShow,
  (state) => state.shows,
);

export const getPopularShows = createSelector(
  selectShow,
  (state) => state.mostPopularShows,
);

export const getRandomPopularShow = createSelector(
  selectShow,
  (state) => {
    const index = Math.floor(Math.random() * state.mostPopularShows.length);

    return {
      ...state.mostPopularShows[index],
      position: index + 1,
    };
  }
);
