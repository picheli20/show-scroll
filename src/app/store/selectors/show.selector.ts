import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Show } from 'src/app/interfaces/show.interface';
import { ShowState } from '../interfaces/show.interface';

export const selectShow = createFeatureSelector<ShowState>('show');

export const selectIsShowLoading = createSelector(
  selectShow,
  (state) => state.isLoading,
);

export const selectShows = createSelector(
  selectShow,
  (state) => state.shows,
);

export const selectPopularShows = createSelector(
  selectShows,
  (shows) => [...shows].sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0)).slice(0, 20),
);

export const selectShowsByGenre = createSelector(
  selectShows,
  (shows) => {
    const groupedByGenres: { [key: string]: Show[] } = {};
    const popuplarShows: Show[] = [...shows].sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0));

    popuplarShows.forEach((show) => {
      show.genres?.forEach((genre) => {
        if (!groupedByGenres[genre]) {
          groupedByGenres[genre] = [];
        }
        groupedByGenres[genre].push(show);
      });
    });

    return Object.keys(groupedByGenres)
      .sort((a, b) => a.localeCompare(b))
      .map((genre) => ({
        name: genre.charAt(0).toUpperCase() + genre.slice(1),
        total: groupedByGenres[genre].length,
        all: groupedByGenres[genre],
        populars: groupedByGenres[genre].slice(0, 20),
      }));
  }
);

export const selectRandomPopularShow = createSelector(
  selectPopularShows,
  (popularShows) => {
    if (popularShows.length === 0) {
      return {} as any;
    }

    const index = Math.floor(Math.random() * popularShows.length);

    return {
      ...popularShows[index],
      position: index + 1,
    };
  }
);
