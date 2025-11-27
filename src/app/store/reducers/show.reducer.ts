import { createReducer, on } from '@ngrx/store';
import { setShowLoading, setShows } from '../actions/show.actions';
import { ShowState } from '../interfaces/show.interface';

export const initialState: ShowState = {
  isLoading: false,
  shows: [],
};

export const showReducer = createReducer(
  initialState,
  on(setShowLoading, (state, { isLoading }): ShowState => ({
    ...state,
    isLoading,
  })),
  on(setShows, (state, { shows }): ShowState => ({
    ...state,
    shows,
  })),
);
