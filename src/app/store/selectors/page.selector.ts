import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PageState } from '../interfaces/page.interface';

export const selectPage = createFeatureSelector<PageState>('page');

export const isLoading = createSelector(
  selectPage,
  (state) => {
    return state.isLoading;
  }
);

export const getTheme = createSelector(
  selectPage,
  (state) => {
    return state.theme;
  }
);
