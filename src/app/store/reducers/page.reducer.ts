import { createReducer, on } from '@ngrx/store';
import { Theme } from '../../enums/theme.enum';
import { setTheme, setViewingGenre } from '../actions/page.actions';
import { PageState } from '../interfaces/page.interface';

export const initialState: PageState = {
  isLoading: false,
  theme: Theme.DARK,
  viewingGenre: undefined,
};

export const pageReducer = createReducer(
  initialState,
  on(setTheme, (state, { theme }): PageState => ({
    ...state,
    theme,
  })),
  on(setViewingGenre, (state, { genre }): PageState => ({
    ...state,
    viewingGenre: genre,
  })),
);
