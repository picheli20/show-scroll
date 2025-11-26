import { createReducer, on } from '@ngrx/store';
import { Show } from 'src/app/interfaces/show.interface';
import { setShowLoading, setShows } from '../actions/show.actions';
import { ShowState } from '../interfaces/show.interface';

export const initialState: ShowState = {
  isLoading: false,
  shows: [],
  mostPopularShows: [],
  showsByGenre: [],
};

export const showReducer = createReducer(
  initialState,
  on(setShowLoading, (state, { isLoading }) => ({
    ...state,
    isLoading,
  })),
  on(setShows, (state, { shows }) => {
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

    return {
      ...state,
      shows,
      mostPopularShows: popuplarShows.slice(0, 20),
      showsByGenre: Object.keys(groupedByGenres)
        .sort((a, b) => a.localeCompare(b))
        .map((genre) => ({
          name: genre.charAt(0).toUpperCase() + genre.slice(1),
          total: groupedByGenres[genre].length,
          all: groupedByGenres[genre],
          populars: groupedByGenres[genre].slice(0, 20),
        })),
    };
  }),
);
