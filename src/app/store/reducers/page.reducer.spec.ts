import { Theme } from '../../enums/theme.enum';
import { setTheme, setViewingGenre } from '../actions/page.actions';
import { initialState, pageReducer } from './page.reducer';

describe('pageReducer', () => {
  describe('setTheme', () => {
    it('should set theme to LIGHT', () => {
      const action = setTheme(Theme.LIGHT);
      const state = pageReducer(initialState, action);

      expect(state.theme).toBe(Theme.LIGHT);
      expect(state.isLoading).toBe(initialState.isLoading);
    });

    it('should set theme to DARK', () => {
      const action = setTheme(Theme.DARK);
      const state = pageReducer({ ...initialState, theme: Theme.LIGHT }, action);

      expect(state.theme).toBe(Theme.DARK);
      expect(state.isLoading).toBe(initialState.isLoading);
    });
  });

  describe('setViewingGenre', () => {
    it('should set viewingGenre to a genre name', () => {
      const action = setViewingGenre('Drama');
      const state = pageReducer(initialState, action);

      expect(state.viewingGenre).toBe('Drama');
      expect(state.theme).toBe(initialState.theme);
      expect(state.isLoading).toBe(initialState.isLoading);
    });

    it('should set viewingGenre to undefined', () => {
      const action = setViewingGenre(undefined);
      const state = pageReducer({ ...initialState, viewingGenre: 'Comedy' }, action);

      expect(state.viewingGenre).toBeUndefined();
      expect(state.theme).toBe(initialState.theme);
    });

    it('should update viewingGenre from one genre to another', () => {
      const action = setViewingGenre('Action');
      const state = pageReducer({ ...initialState, viewingGenre: 'Drama' }, action);

      expect(state.viewingGenre).toBe('Action');
    });
  });
});
