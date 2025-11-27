import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PageState } from '../interfaces/page.interface';

export const selectPage = createFeatureSelector<PageState>('page');

export const selectIsLoading = createSelector(
  selectPage,
  (state) => state.isLoading,
);

export const selectTheme = createSelector(
  selectPage,
  (state) => state.theme,
);
